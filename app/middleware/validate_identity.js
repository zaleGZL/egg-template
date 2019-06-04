'use strict';

// 根据 token 中的 identity 来验证身份
module.exports = (expectedIdentity = '') => {
  return async function validateToken(ctx, next) {
    const { identity } = ctx.state.user.data;

    // 检查身份是否正确
    if (expectedIdentity === identity) {
      await next();
    } else {
      ctx.helper.fail(ctx, '登录token验证失败.');
    }
  };
};
