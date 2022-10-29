const { User, Paste } = require("../models");
const { signToken } = require("../utils/auth");
const {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-errors");

// good enough regex for email validation: https://emailregex.com
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// define max paste per user
require("dotenv").config();
const PASTE_PER_USER = parseInt(process.env.PASTE_PER_USER) || 100;

// wrapper for resolvers, so standard pre-checks are kept track of and any errors get handled.
async function runResolver({ checks, main }) {
  try {
    // if a check is false, then convert it to a thunk that doesnt error to be called;
    Object.keys(checks).forEach((x) =>
      checks[x] ? true : (checks[x] = () => true)
    );
    // runs checks in order;
    await checks.Authentication();
    await checks.Authorization();
    await checks.Accounting();
    await checks.InputValidation();
    // if no check errors out, then main is called;
    result = await main();
    return result;
  } catch (err) {
    console.log(err);
    switch (err.type) {
      // Authentication Error Handling
      case "Authentication":
        throw new AuthenticationError(err.message);
      // Authroization Error Handling
      case "Authorization":
        throw new ForbiddenError(err.message);
      case "Duplicate":
        throw new UserInputError(err.message);
      // Accounting Error Handling
      case "Accounting":
        throw new ForbiddenError(err.message);
      // Input Validation Error Handling
      case "InputValidation":
        throw new UserInputError(err.message);
      // Not Found Error Handling
      case "NotFound":
        throw new UserInputError(err.message);
      // Default Error Handling
      default:
        throw "Something went wrong!";
    }
  }
}

// Default Checks
const DefaultAuthenticationCheck = (context) => {
  return () => {
    if (!context.user) {
      throw { type: "Authentication", message: "Not logged in" };
    }
  };
};
const DefaultAuthorizationCheck = (model, uuid, context) => {
  return async () => {
    const owner = context.user._id;
    const owned = await model.findOne({ uuid, owner });
    if (!owned) {
      throw { type: "Authorization", message: "Action Not allowed" };
    }
  };
};
const DefaultAccountingCheck = (context) => {
  return async () => {
    const user = await User.findById(context.user._id).populate("pastes");
    const pasteCount = user.pasteCount;
    if (pasteCount >= PASTE_PER_USER) {
      throw {
        type: "Accounting",
        message: "Not allowed to create more pastes",
      };
    }
  };
};
const DefaultNotFoundCheck = (object, name) => {
  if (!object) {
    throw { type: "NotFound", message: `${name} not found` };
  }
};
const DefaultCreateCheck = async (model, value) => {
  let entity = {};
  try {
    entity = await model.create(value);
  } catch (err) {
    console.log(err);
    switch (err.code) {
      case 11000:
        throw {
          type: "Duplicate",
          message: `${model.collection.collectionName} already exists`,
        };
      default:
        throw "creation error";
    }
  }
  if (!entity) {
    throw "entity creation error";
  }
  return entity;
};

const InputEmailCheck = (email) => {
  if (!email.match(emailRegex)) {
    throw {
      type: "InputValidation",
      message: "Please enter valid Email address.",
    };
  }
};

const InputTextCheck = (text) => {
  if (text.length === 0) {
    throw {
      type: "InputValidation",
      message: "Must leave paste",
    };
  }
  if (text.length > 10000) {
    throw {
      type: "InputValidation",
      message: "Paste text is too long!",
    };
  }
};

const InputPasswordCheck = (password) => {
  if (password.length < 8) {
    throw {
      type: "InputValidation",
      message: "Password is too short. Must be between 8-20 characters long.",
    };
  }
  if (password.length > 20) {
    throw {
      type: "InputValidation",
      message: "Password is too long. Must be between 8-20 characters long.",
    };
  }
  if (!password.match(/[a-z]/)) {
    throw {
      type: "InputValidation",
      message: "Password must contain at least one lower case character.",
    };
  }
  if (!password.match(/[A-Z]/)) {
    throw {
      type: "InputValidation",
      message: "Password must contain at least one upper case character.",
    };
  }
  if (!password.match(/[0-9]/)) {
    throw {
      type: "InputValidation",
      message: "Password must contain at least one number.",
    };
  }
  // special chars from: https://owasp.org/www-community/password-special-characters
  if (!password.match(/[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/)) {
    throw {
      type: "InputValidation",
      message: "Password must contain at least one special character.",
    };
  }
};

// Resolvers
const resolvers = {
  Query: {
    // me query
    me: async (parent, args, context) => {
      const checks = {
        Authentication: DefaultAuthenticationCheck(context),
        Authorization: false,
        Accounting: false,
        InputValidation: false,
      };
      const main = async () => {
        const userData = await User.findById(context.user._id)
          .select("-__v -password")
          .populate({ path: "pastes", select: "-__v -_id" });
        DefaultNotFoundCheck(userData, "User");
        return userData;
      };
      const result = await runResolver({ checks, main });
      return result;
    },

    // readPaste query
    readPaste: async (parent, { input: { uuid } }, context) => {
      const checks = {
        Authentication: false,
        Authorization: false,
        Accounting: false,
        InputValidation: false,
      };
      const main = async () => {
        const paste = await Paste.findOne({ uuid }).select("-__v -_id");
        DefaultNotFoundCheck(paste, "Paste");
        return paste;
      };
      const result = await runResolver({ checks, main });
      return result;
    },
  },

  Mutation: {
    // login mutation
    login: async (parent, { input: { email, password } }, context) => {
      const checks = {
        Authentication: false,
        Authorization: false,
        Accounting: false,
        InputValidation: () => {
          InputEmailCheck(email);
        },
      };
      const main = async () => {
        const user = await User.findOne({ email })
          .select("-__v")
          .populate({ path: "pastes", select: "-__v -_id" });
        if (!user) {
          throw { type: "Authentication", message: "Incorrect credentials" };
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw { type: "Authentication", message: "Incorrect credentials" };
        }
        const token = signToken(user);
        return { token, user };
      };
      const result = await runResolver({ checks, main });
      return result;
    },

    // signup mutation
    signup: async (parent, { input }, context) => {
      const checks = {
        Authentication: false,
        Authorization: false,
        Accounting: false,
        InputValidation: () => {
          InputEmailCheck(input.email);
          InputPasswordCheck(input.password);
        },
      };
      const main = async () => {
        const user = await DefaultCreateCheck(User, input);
        const token = signToken(user);
        return { token, user };
      };
      const result = await runResolver({ checks, main });
      return result;
    },

    // createPaste mutation
    createPaste: async (parent, { input }, context) => {
      const checks = {
        Authentication: DefaultAuthenticationCheck(context),
        Authorization: false,
        Accounting: DefaultAccountingCheck(context),
        InputValidation: () => {
          InputTextCheck(input.text);
        },
      };
      const main = async () => {
        const owner = context.user._id;
        const paste = await DefaultCreateCheck(Paste, { ...input, owner });
        const updatedUser = await User.findByIdAndUpdate(
          owner,
          { $push: { pastes: paste._id } },
          { new: true, runValidators: true }
        )
          .select("-__v -password")
          .populate({ path: "pastes", select: "-__v -_id" });
        return updatedUser;
      };
      const result = await runResolver({ checks, main });
      return result;
    },

    // updatePaste mutation
    updatePaste: async (parent, { input: { uuid, text } }, context) => {
      const checks = {
        Authentication: DefaultAuthenticationCheck(context),
        Authorization: DefaultAuthorizationCheck(Paste, uuid, context),
        Accounting: false,
        InputValidation: () => {
          InputTextCheck(text);
        },
      };
      const main = async () => {
        const owner = context.user._id;
        const updatedPaste = await Paste.findOneAndUpdate(
          { uuid, owner },
          { text }
        );
        DefaultNotFoundCheck(updatedPaste, "Paste");
        const updateUser = await User.findById(owner)
          .select("-__v -password")
          .populate({ path: "pastes", select: "-__v -_id" });
        return updateUser;
      };
      const result = await runResolver({ checks, main });
      return result;
    },

    // deletePaste mutation
    deletePaste: async (parent, { input: { uuid } }, context) => {
      const checks = {
        Authentication: DefaultAuthenticationCheck(context),
        Authorization: DefaultAuthorizationCheck(Paste, uuid, context),
        Accounting: false,
        InputValidation: false,
      };
      const main = async () => {
        const owner = context.user._id;
        const deletedPaste = await Paste.findOneAndDelete({ uuid, owner });
        DefaultNotFoundCheck(deletedPaste, "Paste");
        const updatedUser = await User.findById(owner)
          .select("-__v -password")
          .populate({ path: "pastes", select: "-__v -_id" });
        return updatedUser;
      };
      const result = await runResolver({ checks, main });
      return result;
    },
  },
};

module.exports = resolvers;
