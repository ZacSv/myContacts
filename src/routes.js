const { Router } = require("express");
const ContactController = require("./app/controllers/ContactController");
const CategoryController = require("./app/controllers/CategoryController");
const router = Router();

// ROTAS CONTATOS //
router.get("/contatos", ContactController.index);
router.get("/contatos/:id", ContactController.show);
router.delete("/contatos/:id", ContactController.delete);
router.post("/contatos", ContactController.store);
router.put("/contatos/:id", ContactController.update);

//ROTAS CATEGORIAS//
router.get("/category", CategoryController.index);
router.get("/category:id", CategoryController.show);
router.post("/category", CategoryController.store);
router.put("/category/:id", CategoryController.update);
router.delete("/category/:id", CategoryController.delete);

module.exports = router;
