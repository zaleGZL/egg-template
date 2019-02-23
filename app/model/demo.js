'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema } = mongoose;
  const { Types } = Schema;

  // demo Schema
  const DemoSchema = new Schema({
    // 名称
    name: {
      type: Types.String,
      required: true,
    },
  });

  DemoSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  });

  return mongoose.model('Demo', DemoSchema);
};
