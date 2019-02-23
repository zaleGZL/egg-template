'use strict';

const Controller = require('egg').Controller;

class DemoController extends Controller {
  async getAll() {
    // 业务处理
    const res = await this.ctx.service.demo.getAll();
    this.ctx.helper.success(this.ctx, res);
  }

  async create() {
    const demoInfo = this.ctx.request.body;

    // 验证参数
    this.ctx.validate(
      {
        name: { type: 'string' },
      },
      demoInfo
    );

    // 业务处理
    const res = await this.ctx.service.demo.create(demoInfo);
    this.ctx.helper.success(this.ctx, res);
  }

  async get() {
    const { id } = this.ctx.params;
    // const { page, pageSize } = this.ctx.query;

    const queryData = { id };

    // 验证参数
    this.ctx.validate(
      {
        id: { type: 'objectId' },
      },
      queryData
    );

    // 业务处理
    const res = await this.ctx.service.demo.get(queryData.id);
    this.ctx.helper.success(this.ctx, res);
  }

  async update() {
    const { id } = this.ctx.params;
    const demoInfo = this.ctx.request.body;

    const queryData = { id, ...demoInfo };

    // 验证参数
    this.ctx.validate(
      {
        id: { type: 'objectId' },
        name: { type: 'string' },
      },
      queryData
    );

    // 业务处理
    const res = await this.ctx.service.demo.update(queryData);
    this.ctx.helper.success(this.ctx, res);
  }

  async delete() {
    const { id } = this.ctx.params;

    const queryData = { id };

    // 验证参数
    this.ctx.validate(
      {
        id: { type: 'objectId' },
      },
      queryData
    );

    // 业务处理
    const res = await this.ctx.service.demo.delete(queryData.id);
    this.ctx.helper.success(this.ctx, res);
  }

  async updateCsrfToken() {
    this.ctx.rotateCsrfSecret();
    this.ctx.helper.success(this.ctx, {});
  }

  async setJwtToken() {
    this.ctx.service.token.set({ name: 'zale', identity: 'USER' }, 1);
    this.ctx.helper.success(this.ctx, {});
  }

  async getUserInfo() {
    this.ctx.helper.success(this.ctx, this.ctx.state.user);
  }
}

module.exports = DemoController;
