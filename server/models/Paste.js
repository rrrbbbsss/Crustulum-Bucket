const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const pasteSchema = new Schema(
  {
    pasteText: {
      type: String,
      required: 'Must leave crust',
      minlength: 3,
      maxlength: 10000
    },
    timeStamp: {
      type: Date,
      default: Date.now
    },
    UUID: {
      type: String,
      default: uuidv4
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Paste = model('Paste', pasteSchema);

module.exports = Paste;