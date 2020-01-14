const db = require('../../db');

const retrieveCategories = async (req, res) => {
  return await db.getAllCategories();
};


module.exports = {
  retrieveCategories
};
