 import categoriesController from '../src/controllers/categoriesController';

describe('categories test', () => {
    it('should retrieve the categories',  () => {
        let categories =  categoriesController.findAllCategories();
        expect(Object.keys(categories).length).toBe(219);
    })
});
