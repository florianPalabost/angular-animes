const Orders = require('../models_base').Order;

const getAll = () => Orders.findAll();
const get = id => Orders.findById(id);
const add = order => Orders.create(order);

module.exports = {add, getAll, getById};
