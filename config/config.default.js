/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const config = {};

  // 全局中间件
  config.middleware = ['errorHandler'];
  // errorHandler 中间件 只对 /api 前缀的 url 路径生效
  // config.errorHandler = {
  //   match: '/api',
  // };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1550884645416_4916';

  // 跨域及安全设置
  config.security = {
    csrf: {
      queryName: 'x-csrf-token',
      // enable: false,
    },
    domainWhiteList: ['*'],
    // domainWhiteList: [
    //   'http://www.example.com',
    // ],
  };
  config.cors = {
    // 如果没有设置 origin，则将使用 security.domainWhiteList 覆盖该参数
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // MongoDB 数据库连接及配置
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/template',
      options: {
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        bufferMaxEntries: 0,
      },
    },
  };

  // JSON Web Token 设置
  config.jwt = {
    secret: '9rQcwIv|S{ib.&$ue}E7C/[>G97NU/ansSv7]Us0gfKJX|)Ss<&LhX;mC_}8i@)',
  };

  // 参数验证设置
  config.validate = {
    convert: true,
  };

  // 字符串加密处理
  config.bcrypt = {
    saltRounds: 10, // default 10
  };

  // 用户自定义的
  const userConfig = {
    admin: {
      account: 'admin',
      password: 'admin',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
