const { User, Paste } = require("../models");
const { signToken } = require("../utils/auth");
const { GraphQLError } = require("graphql");

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
        throw new GraphQLError(err.message, {
          extension: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      // Authroization Error Handling
      case "Authorization":
        throw new GraphQLError(err.message, {
          extension: {
            code: "todo",
            http: { status: 403 },
          },
        });
      // Accounting Error Handling
      case "Accounting":
        throw new GraphQLError(err.message, {
          extension: {
            code: "todo",
            http: { status: 403 },
          },
        });
      // Input Validation Error Handling
      case "InputValidation":
        throw new GraphQLError(err.message, {
          extension: {
            code: "BAD_USER_INPUT",
            http: { status: 400 },
          },
        });
      // Not Found Error Handling
      case "NotFound":
        throw new GraphQLError(err.message, {
          extension: {
            code: "todo",
            http: { status: 404 },
          },
        });
      // Default Error Handling
      default:
        throw new GraphQLError("Something went wrong!", {
          extension: {
            code: "INTERNAL_SERVER_ERROR",
            http: { status: 500 },
          },
        });
    }
  }
}

// Default Checks
DefaultAuthenticationCheck = (context) => {
  return () => {
    if (!context.user) {
      throw { type: "Authentication", message: "Not logged in" };
    }
  };
};
DefaultAuthorizationCheck = (user, object) => {
  "todo";
};
DefaultAccountingCheck = (user) => {
  "todo";
};
DefaultNotFoundCheck = (object, name) => {
  if (!object) {
    throw { type: "NotFound", message: `${name} not found` };
  }
};

// Resolvers
const resolvers = {
  Query: {
    // me query
    me: async (parent, args, context) => {
      const checks = {
        Authentication: DefaultAccountingCheck(context),
        Authorization: false,
        Accounting: false,
        InputValidation: false,
      };
      const main = async () => {
        const userData = await User.findById(context.user._id)
          .select("-__v -password")
          .populate({ paste: "pastes", select: "-__v -_id" });
        DefaultNotFoundCheck(userData, "User");
        return userData;
      };
      const result = await runResolver({ checks, main });
      return result();
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
      return result();
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
          // todo: validate email
          // todo: validate password
          return "todo";
        },
      };
      const main = async () => {
        const user = await User.findOne({ email })
          .select("-__v -password")
          .populate({ paste: "pastes", select: "-__v -_id" });
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
      return result();
    },

    // signup mutation
    signup: async (parent, { input }, context) => {
      const checks = {
        Authentication: false,
        Authorization: false,
        Accounting: false,
        InputValidation: () => {
          // todo: validate email
          // todo: validate password
          return "todo";
        },
      };
      const main = async () => {
        const user = await User.create(input);
        // todo filer out password when returning
        if (!user) {
          throw "user creation error";
        }
        const token = signToken(user);
        return { token, user };
      };
      const result = await runResolver({ checks, main });
      return result;
    },

    // createPaste mutation
    createPaste: async (parent, { input: text }, context) => {
      const checks = {
        Authentication: DefaultAuthenticationCheck(context),
        Authorization: false,
        Accounting: () => {
          return "todo";
        },
        InputValidation: () => {
          if (text.length > 10000) {
            throw {
              type: "InputValidation",
              message: "Paste text is too long!",
            };
          }
        },
      };
      const main = async () => {
        const paste = await Paste.create({
          text,
        });
        if (!paste) {
          throw "paste creation error";
        }
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
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
    updatePaste: async (parent, { input: uuid, text }, context) => {
      const checks = {
        Authentication: DefaultAuthenticationCheck(context),
        Authorization: () => {
          return "todo";
        },
        Accounting: false,
        InputValidation: () => {
          if (text.length > 10000) {
            throw {
              type: "InputValidation",
              message: "Paste text is too long!",
            };
          }
        },
      };
      const main = async () => {
        const updatedPaste = await Paste.findOneAndUpdate({ uuid }, { text });
        const updateUser = await User.findById(context.user._id)
          .select("-__v -password")
          .populate({ path: "pastes", select: "-__v -_id" });
        return updateUser;
      };
      const result = await runResolver({ checks, main });
      return result;
    },

    // deletePaste mutation
    deletePaste: async (parent, { input: uuid }, context) => {
      const checks = {
        Authentication: DefaultAuthenticationCheck(context),
        Authorization: () => {
          return "todo";
        },
        Accounting: false,
        InputValidation: false,
      };
      const main = async () => {
        const deletedPaste = await Paste.findOneAndDelete({ uuid });
        DefaultNotFoundCheck(deletedPaste, "Paste");
        const updatedUser = await User.findById(context.user._id)
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
