'use strict';

const Service = require('egg').Service;

class DemoService extends Service {
  /**
   * ========================================= 创建 demo ==============================================>
   *
   * @param {object} demoInfo demo信息
   * @return {string} token信息
   * @memberof DemoService
   */
  async create(demoInfo) {
    const { email, phone, password } = demoInfo;

    // 检查该Demo的 email 是否已经被注册
    const existDemo = await this.ctx.model.Demo.findOne({ email }).exec();
    if (existDemo) {
      this.ctx.throw(400, '该Demo已被注册.');
    }

    // 对密码进行 MD5 加密
    const secretPassword = await this.ctx.genHash(password);

    // 创建 demo
    const newDemo = await this.ctx.model.Demo.create({
      email,
      phone,
      identity: 'DEMO',
      password: secretPassword,
    });

    // 生成 Demo 的 token
    const token = await this.service.token.generate(
      {
        id: newDemo._id,
        identity: newDemo.identity,
      },
      30
    );

    // 返回用户 token
    return token;
  }

  /**
   * ========================================= 获取 demo ==============================================>
   *
   * @param {object} demoInfo demo信息
   * @return {string} token信息
   * @memberof DemoService
   */
  async get(demoInfo) {
    const { email, password } = demoInfo;

    // 检查是否存在该 demo
    const existDemo = await this.ctx.model.Demo.findOne({ email }).exec();
    if (!existDemo) {
      this.ctx.throw(400, '该Demo不存在');
    }

    // 检查输入的密码是否正确
    const checked = await this.ctx.compare(password, existDemo.password);
    if (!checked) {
      this.ctx.throw(400, '密码错误.');
    }

    // 生成用户的 token
    const token = await this.service.token.generate(
      {
        id: existDemo._id,
        identity: existDemo.identity,
      },
      30
    );

    // 返回 token
    return token;
  }

  /**
   * ========================================= 验证是否存在 demo ==============================================>
   *
   * @param {String} id demo的 id
   * @return {string} token信息
   * @memberof DemoService
   */
  async validate(id) {
    // 检查是否存在该 demo
    const existDemo = await this.ctx.model.Demo.findById(id).exec();
    if (!existDemo) {
      this.ctx.throw(400, '该账号已经不存在');
    }
  }

  /**
   * ========================================= 获取 demo 列表 ==============================================>
   *
   * @return {array} demo 列表
   * @memberof DemoService
   */
  async getAll() {
    const demoList = await this.ctx.model.Demo.find()
      .select({ email: 1, phone: 1 })
      .exec();
    return demoList;
  }

  /**
   * ========================================= 更新 demo ==============================================>
   *
   * @param {object} updatedData 更新的数据
   * @memberof DemoService
   */
  async update(updatedData) {
    const { id, phone } = updatedData;
    const demo = await this.ctx.model.Demo.findByIdAndUpdate(id, { phone }).exec();
    if (!demo) {
      this.ctx.throw(400, '该Demo不存在.');
    }
  }

  /**
   * ========================================= 删除 demo ==============================================>
   *
   * @param {string} id demo的id
   * @memberof DemoService
   */
  async delete(id) {
    const demo = await this.ctx.model.Demo.findByIdAndDelete(id).exec();
    if (!demo) {
      this.ctx.throw(400, '该Demo不存在.');
    }
  }
}

module.exports = DemoService;
