const { User, Paste } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // checks
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }
      // main
      try {
        const userData = await User.findById(context.user._id)
          .select("-__v -password")
          .populate({ paste: "pastes", select: "-__v -_id" });

        return userData;
      } catch (err) {
        console.log(err);
        throw new GraphQLError("Something is wrong!", {
          extension: {
            code: "INTERNAL_SERVER_ERROR",
            http: { status: 500 },
          },
        });
      }
    },
    readPaste: async (parent, { input: { uuid } }, context) => {
      // checks
      // main
      try {
        const paste = await Paste.findOne({ uuid }).select("-__v -_id");
        return paste;
      } catch (err) {
        console.log(err);
        throw new GraphQLError("Something is wrong!", {
          extension: {
            code: "INTERNAL_SERVER_ERROR",
            http: { status: 500 },
          },
        });
      }
    },
  },
  Mutations: {
    login: async (parent, { input: { email, password } }, context) => {
      // checks
      // main - todo: refactor
      const user = await User.findOne({ email })
        .select("-__v -password")
        .populate({ paste: "pastes", select: "-__v -_id" });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    signup: async (parent, { input }, context) => {
      // checks
      // main - todo: refacto
      const user = await User.create(input).select("-__v -password");
      if (!user) {
        throw new GraphQLError("Something is wrong!", {
          extension: {
            code: "INTERNAL_SERVER_ERROR",
            http: { status: 500 },
          },
        });
      }
      const token = signToken(user);
      return { token, user };
    },
    createPaste: async (parent, { input: text }, context) => {
      // checks
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }
      if (text.length > 10000) {
        throw new GraphQLError("Paste text is too long!", {
          extension: {
            code: "BAD_USER_INPUT",
            http: { status: 400 },
          },
        });
      }
      // main
      try {
        const paste = await Paste.create({
          text,
        });
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { pastes: paste._id } },
          { new: true, runValidators: true }
        )
          .select("-__v -password")
          .populate({ path: "pastes", select: "-__v -_id" });
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new GraphQLError("Something is wrong!", {
          extension: {
            code: "INTERNAL_SERVER_ERROR",
            http: { status: 500 },
          },
        });
      }
    },
    updatePaste: async (parent, { input: uuid, text }, context) => {
      // checks
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }
      if (text.length > 10000) {
        throw new GraphQLError("Paste text is too long!", {
          extension: {
            code: "BAD_USER_INPUT",
            http: { status: 400 },
          },
        });
      }
      // todo: check if paste is owned by user
      try {
        const updatedPaste = await Paste.findOneAndUpdate({ uuid }, { text });
        const updateUser = await User.findById(context.user._id)
          .select("-__v -password")
          .populate({ path: "pastes", select: "-__v -_id" });
      } catch (err) {
        console.log(err);
        throw new GraphQLError("Something is wrong!", {
          extension: {
            code: "INTERNAL_SERVER_ERROR",
            http: { status: 500 },
          },
        });
      }
    },
    deletePaste: async (parent, { input: uuid }, context) => {
      // checks
      if (!context.user) {
        throw new AuthenticationError("Not logged in");
      }
      // todo make sure paste owned by user
      // main
      try {
        const deletedPaste = await Paste.findOneAndDelete({ uuid }, { text });
        const updatedUser = await User.findById(context.user._id)
          .select("-__v -password")
          .populate({ path: "pastes", select: "-__v -_id" });
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new GraphQLError("Something is wrong!", {
          extension: {
            code: "INTERNAL_SERVER_ERROR",
            http: { status: 500 },
          },
        });
      }
    },
  },
};

module.exports = resolvers;
