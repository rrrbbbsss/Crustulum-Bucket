const { Schema, model } = require('mongoose');
//Dateformatter? "createdAt" use graphql-iso-date or normal dateformat utils? 
//UUID integratiom??

const pasteSchema = new Schema(
  {
    pasteText: {
      type: String,
      required: 'Must leave crust',
      minlength: 3,
      maxlength: 10000
    },
    email: {
      type: String,
      required: true
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