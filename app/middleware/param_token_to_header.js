'use strict';

module.exports = () => {
  return async function paramTokenToHeader(ctx, next) {
    const authorization = ctx.header.authorization || ctx.query.Authorization;
    ctx.header.authorization = authorization;
    await next();
  };
};
