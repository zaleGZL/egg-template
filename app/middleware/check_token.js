'use strict';

module.exports = (expectedIdentity = '') => {
  return async function validateToken(ctx, next) {
    const jwtToken = ctx.cookies.get('jwt-token', { signed: false });
    let decoded = null;

    if (jwtToken) {
      try {
        decoded = ctx.app.jwt.verify(jwtToken, ctx.app.config.jwt.secret);
      } catch (error) {
        // 清除该 jwt-token cookie
        ctx.cookies.set('jwt-token', null);
        ctx.helper.fail(ctx, 'jwt-token 已失效.', 401);
        return;
      }

      ctx.state.user = decoded.data;
      const { identity, id } = decoded.data;

      // 检查身份是否正确
      if (expectedIdentity === identity) {
        // 设置用户 Id
        ctx.state.userId = id;
        await next();
      } else {
        ctx.helper.fail(ctx, 'jwt-token 身份验证失败.', 401);
      }
    } else {
      ctx.helper.fail(ctx, '缺少 jwt-token 验证信息.', 401);
    }
  };
};
