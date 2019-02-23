'use strict';

const mongoose = require('mongoose');

module.exports = app => {
  app.validator.addRule('objectId', (rule, value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return 'Not a valid bson ObjectID';
    }
  });
};
