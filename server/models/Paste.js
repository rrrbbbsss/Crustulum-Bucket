const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const PASTE_PERIOD = parseInt(process.env.PASTE_PERIOD) || 60 * 60 * 24;

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
      virtuals: true,
    },
  }
);

pasteSchema.virtual("expires").get(function () {
  return new Date(this.created).getTime() + PASTE_PERIOD;
});

const Paste = model("Paste", pasteSchema);

module.exports = Paste;
