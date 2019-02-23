'use strict';

module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const message = status === 500 && ctx.app.config.env === 'prod' ? 'Internal Server Error' : err.message;

      const failData = status >= 400 && status < 500 && err.data ? err.data : {};

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        data: {
          message,
          ...failData,
        },
        status: status >= 500 ? 'error' : 'fail',
      };

      // 请求参数格式出错
      if (err.code === 'invalid_param') {
        ctx.body.data = {
          message: '请求参数格式错误',
          errors: err.errors,
        };
      }

      ctx.status = status;
    }
  };
};
