'use strict';

const Service = require('egg').Service;

class TokenService extends Service {
  /**
   * 生成 token
   *
   * @param {object} data token 中的 data 信息 
   * @param {number} day 有效时间
   * @return {string} token
   * @memberof TokenService
   */
  async generate(data = {}, day = 7) {
    return this.ctx.app.jwt.sign(
      {
        data,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * day,
      },
      this.ctx.app.config.jwt.secret
    );
  }
}

module.exports = TokenService;
