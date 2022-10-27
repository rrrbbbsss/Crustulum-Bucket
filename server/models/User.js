const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
    },
    pastes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Paste",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//Bcrypt
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// virtual book count
userSchema.virtual("pasteCount").get(function () {
  return this.pastes.length;
});

const User = model("User", userSchema);
module.exports = User;
