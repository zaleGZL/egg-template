'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 验证用户 token 的中间件
  const validateUserToken = app.middleware.checkToken('USER');

  router.get('/demos/token', validateUserToken, controller.demo.getUserInfo);

  router.get('/demos', controller.demo.getAll);
  router.get('/demos/:id', controller.demo.get);
  router.post('/demos', controller.demo.create);
  router.put('/demos/:id', controller.demo.update);
  router.delete('/demos/:id', controller.demo.delete);

  router.post('/demos/csrf-token', controller.demo.updateCsrfToken);
  router.post('/demos/jwt-token', controller.demo.setJwtToken);
};
