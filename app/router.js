'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 验证demo token 的中间件
  const validateDemoToken = [app.middleware.paramTokenToHeader(), app.jwt, app.middleware.validateIdentity('DEMO')];


  // demo 账号注册
  router.post('/api/demos/sign-up', controller.demo.create);
  // demo 账号登录
  router.get('/api/demos/sign-in', controller.demo.get);
  // demo token 验证
  router.get('/api/demos/token', ...validateDemoToken, controller.demo.validateToken);


  // 获取所有的 demo 账号信息
  router.get('/api/demos', controller.demo.getAll);
  // 更新某个 demo 账号信息
  router.put('/api/demos', controller.demo.update);
  // 删除某个 demo 账号
  router.delete('/api/demos/id/:id', controller.demo.delete);
};
