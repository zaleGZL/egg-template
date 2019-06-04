'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema } = mongoose;
  const { Types } = Schema;

  // demo Schema
  const DemoSchema = new Schema({
    // 邮箱
    email: {
      type: Types.String,
      required: true,
      unique: true,
    },

    // 手机号
    phone: {
      type: Types.Number,
      required: true,
    },

    // 密码
    password: {
      type: Types.String,
      required: true,
    },

    // 用户身份 = 'DEMO'
    identity: {
      type: Types.String,
      required: true,
      enum: ['DEMO'],
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
