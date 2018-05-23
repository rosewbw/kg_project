/**
 * @description 提供统一的查询接口
 * @return Promise
 * 
 * @author Dai
 */
const createOperations = require('./create');
const findOperations = require('./find');
const deleteOperations = require('./delete');
const updateOperations = require('./update');

module.exports = Object.assign({}, createOperations, findOperations, deleteOperations, updateOperations);
