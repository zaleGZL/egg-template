'use strict';
// const moment = require('moment');

// 返回请求成功的数据
exports.success = (ctx, data = {}, status = 200) => {
  ctx.body = {
    data,
    status: 'success',
  };
  ctx.status = status;
};

// 返回请求失败后的数据
exports.fail = (ctx, data = '', status = 400) => {
  if (typeof data === 'string') {
    data = { message: data };
  }

  ctx.body = {
    data,
    status: 'fail',
  };
  ctx.status = status;
};

// 返回请求错误后的数据
exports.error = (ctx, message = 'Internal Server Error', status = 500) => {
  ctx.body = {
    data: { message },
    status: 'error',
  };
  ctx.status = status;
};

// ObjectId 数组是否包含成员
exports.objectIdsIncludes = (array, objectId) => {
  if (array.findIndex(item => item.toString() === objectId.toString()) > -1) {
    return true;
  }

  return false;
};

// ObjectId 数组添加成员
exports.objectIdsAdd = (array, objectId) => {
  array.push(objectId);
  return array;
};

// ObjectId 数组删除成员
exports.objectIdsDelete = (array, objectId) => {
  return array.filter(item => {
    return item.toString() !== objectId.toString();
  });
};

// // 获取当前时间字符串格式
// exports.nowDateTimeString = () => {
//   const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
//   return moment(new Date()).format(dateTimeFormat);
// };
