'use strict';

const fs = require('fs');
const path = require('path');

/**
 * 检查文件或文件夹是否存在
 *
 * @param {string} path 文件路径
 */
const fsExistsSync = path => {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    return false;
  }
  return true;
};

// 数据库文件
const dbFilePath = path.resolve(__dirname, '../db');
const mongodbDataFilePath = path.resolve(__dirname, '../db/mongodb-data');
const mongodbLogFilePath = path.resolve(__dirname, '../db/mongodb-log');

// 数据库文件不存在则创建
if (!fsExistsSync(dbFilePath)) {
  console.log('数据库文件不存在，立即创建。');

  fs.mkdirSync(dbFilePath);
  fs.mkdirSync(mongodbDataFilePath);
  fs.mkdirSync(mongodbLogFilePath);
} else {
  console.log('数据库文件已存在，无需创建。');
}
