'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // 跨域
  cors: {
    enable: true,
    package: 'egg-cors',
  },

  // mongodb 数据库连接工具
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

  // JSON Web Token
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  // 参数验证
  validate: {
    enable: true,
    package: 'egg-validate',
  },

  // 字符串加密处理库
  bcrypt: {
    enable: true,
    package: 'egg-bcrypt',
  },
};
