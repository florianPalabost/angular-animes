const GenericService = require('../services/genericService');

const findAllCategories = async (req, res) => {
  try {
    const categories = await GenericService.retrieveDb('getAllCategories');
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  findAllCategories,
};
