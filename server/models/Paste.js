const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const pasteSchema = new Schema(
  {
    text: {
      type: String,
      required: "Must leave crust",
      minlength: 1,
      maxlength: 10000,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    uuid: {
      type: String,
      default: uuidv4,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Paste = model("Paste", pasteSchema);

module.exports = Paste;
