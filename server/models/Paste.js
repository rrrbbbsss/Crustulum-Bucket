const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const PASTE_PERIOD =
  parseInt(process.env.PASTE_PERIOD) * 60 * 1000 || 1000 * 60 * 60 * 24;

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
    // boyd was right, did need this to make it easier.
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: "Must have owner",
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
  const expires = new Date(this.created).getTime() + PASTE_PERIOD;
  const minute = 1000 * 60;
  // we run the cleanup job every minute so compute the expires time based off that.
  return new Date(expires + minute - (expires % minute)).toISOString();
});

const Paste = model("Paste", pasteSchema);

module.exports = Paste;
