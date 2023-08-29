const { Router } = require("express");
const ContactController = require("./app/controllers/ContactController");
const router = Router();

router.get("/contatos", ContactController.index);
router.get("/contatos/:id", ContactController.show);
router.delete("/contatos/:id", ContactController.delete);

module.exports = router;
