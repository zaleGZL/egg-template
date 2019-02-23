'use strict';

const Service = require('egg').Service;

class TokenService extends Service {
  /**
   * 生成 token
   *
   * @param {Object} data 数据
   * @param {number} day 有效时间
   * @return {string} token
   * @memberof TokenService
   */
  async set(data, day = 7) {
    const token = this.ctx.app.jwt.sign(
      {
        data,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * day,
      },
      this.config.jwt.secret
    );

    this.ctx.cookies.set('jwt-token', token, {
      maxAge: 1000 * 60 * 60 * 24 * day,
      httpOnly: true,
      signed: false,
      overwrite: true,
    });
  }
}

module.exports = TokenService;
