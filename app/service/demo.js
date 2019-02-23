'use strict';

const Service = require('egg').Service;

class DemoService extends Service {
  async getAll() {
    const demoList = await this.ctx.model.Demo.find().exec();
    return demoList;
  }

  async create(demoInfo) {
    const demo = await this.ctx.model.Demo.create(demoInfo);
    return demo;
  }

  async get(demoId) {
    const demo = await this.ctx.model.Demo.findById(demoId).exec();
    // const { account, password } = this.config.admin;

    if (!demo) {
      this.ctx.throw(400, '该演示不存在.');
    }

    return demo;
  }

  async delete(demoId) {
    const demo = await this.ctx.model.Demo.findByIdAndDelete(demoId).exec();
    if (!demo) {
      this.ctx.throw(400, '该演示不存在.');
    }

    return {};
  }

  async update(payload) {
    const { id, ...demoInfo } = payload;
    const demo = await this.ctx.model.Demo.findByIdAndUpdate(id, demoInfo).exec();
    if (!demo) {
      this.ctx.throw(400, '该演示不存在.');
    }

    return {};
  }
}

module.exports = DemoService;
