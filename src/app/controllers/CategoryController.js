const CategoryRepository = require("../repositories/CategoryRepository");
const ContactRepository = require("../repositories/ContactRepository");
class CategoryController {
    async index(request, response) {
        let categorias = await CategoryRepository.findAll();
        response.json(categorias);
    }
    async show(request, response) {
        const { id } = request.params;
        const category = await CategoryRepository.findById(id);
        if (!category) {
            return response.status(404).json({ error: "Category not found" });
        }
        response.json(category);
    }
    async store(request, response) {
        const { name } = request.body;
        if (!name) {
            response
                .status(400)
                .json({ Error: "Name of category is required" });
        }
        const categoryExists = await CategoryRepository.findByName(name);
        if (categoryExists) {
            return response
                .status(400)
                .json({ Error: "Category has already registered" });
        }
        const category = await CategoryRepository.create({ name });
        response.send(category);
    }
    async update(request, response) {
        const { name } = request.body;
        const { id } = request.params;
        const categoriesExist = CategoryRepository.findById(id);
        if (!categoriesExist) {
            return response
                .status(400)
                .json({ Error: "Category does not exist" });
        }
        const categoryByName = await CategoryRepository.findByName(name);
        if (categoryByName && categoryByName.id == id) {
            return response
                .status(400)
                .json({ Error: "Category has already registered" });
        }
        const category = await CategoryRepository.update(id, { name });
        response.json(category);
    }
    async delete(request, response) {
        const { id } = request.params;
        await CategoryRepository.delete(id);
        response.sendStatus(204);
    }
}

module.exports = new CategoryController();
