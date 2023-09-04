const { Router } = require("express");
const ContactController = require("./app/controllers/ContactController");
const router = Router();

router.get("/contatos", ContactController.index);
router.get("/contatos/:id", ContactController.show);
router.delete("/contatos/:id", ContactController.delete);
router.post("/contatos", ContactController.store);
router.put("/contatos/:id", ContactController.update);

module.exports = router;
