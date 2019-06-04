'use strict';
// this.ctx.params
// this.ctx.query
// this.ctx.request.body

const Controller = require('egg').Controller;

class DemoController extends Controller {
  /**
   * ========================================= 创建 demo ==============================================>
   *
   * @memberof DemoController
   */
  async create() {
    const demoInfo = this.ctx.request.body;

    // 验证参数
    this.ctx.validate(
      {
        // 邮箱
        email: { type: 'email' },
        // 手机号
        phone: { type: 'number' },
        // 密码
        password: { type: 'password', min: 8, max: 20 },
        // 确认密码
        confirmPassword: { type: 'password', min: 8, max: 20, compare: 'password' },
      },
      demoInfo
    );

    // 创建 demo，创建后返回 demo 的 token
    const token = await this.service.demo.create(demoInfo);

    // 返回 token 信息
    this.ctx.helper.success(this.ctx, { token });
  }

  /**
   * ========================================= 获取 demo ==============================================>
   *
   * @memberof DemoController
   */
  async get() {
    const demoInfo = this.ctx.query;

    // 验证参数
    this.ctx.validate(
      {
        // 邮箱
        email: { type: 'email' },
        // 密码
        password: { type: 'password', min: 8, max: 20 },
      },
      demoInfo
    );

    // 获取 demo，成功后返回 token 信息
    const token = await this.service.demo.get(demoInfo);

    // 返回 token 信息
    this.ctx.helper.success(this.ctx, { token });
  }

  /**
   *  ======================================== 验证token ==============================================>
   *   判断标准："Authorization: Bearer eyJ..."
   *
   * @memberof DemoController
   */
  async validateToken() {
    // 查询数据库进行验证
    const { id } = this.ctx.state.user.data;

    // 查询是否存在该 demo
    await this.service.demo.validate(id);

    // 存在的话返回空数据
    this.ctx.helper.success(this.ctx);
  }

  /**
   *  ======================================== 获取所有 demo 信息 ==============================================>
   *
   * @memberof DemoController
   */
  async getAll() {
    // 获取所有 demo 信息
    const list = await this.service.demo.getAll();

    // 返回 demo 列表
    this.ctx.helper.success(this.ctx, { list });
  }

  /**
   *  ======================================== 更新 demo 信息 ==============================================>
   *
   * @memberof DemoController
   */
  async update() {
    const updatedData = this.ctx.request.body;

    // 验证参数
    this.ctx.validate(
      {
        // id
        id: { type: 'objectId' },
        // 手机号
        phone: { type: 'number' },
      },
      updatedData
    );

    // 业务处理
    await this.ctx.service.demo.update(updatedData);

    this.ctx.helper.success(this.ctx);
  }

  /**
   *  ======================================== 删除 demo ==============================================>
   *
   * @memberof DemoController
   */
  async delete() {
    const { id } = this.ctx.params;

    // 验证参数
    this.ctx.validate(
      {
        id: { type: 'objectId' },
      },
      { id }
    );

    // 业务处理
    await this.ctx.service.demo.delete(id);

    this.ctx.helper.success(this.ctx);
  }
}

module.exports = DemoController;
