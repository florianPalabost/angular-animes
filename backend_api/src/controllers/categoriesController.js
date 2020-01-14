const CategoriesService = require('../services/categoriesServices');

const findAllCategories = async (req, res) => {
  try {
    let categories = await CategoriesService.retrieveCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  findAllCategories,
};
