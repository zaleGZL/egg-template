'use strict';

module.exports = (expectedIdentity = '') => {
  return async function validateToken(ctx, next) {
    const { identity, id } = ctx.state.user.data;

    // 检查身份是否正确
    if (expectedIdentity === identity) {
      // 设置用户 Id
      ctx.state.userId = id;
      await next();
    } else {
      ctx.helper.fail(ctx, '登录token验证失败.');
    }
  };
};
