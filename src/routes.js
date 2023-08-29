const { Router } = require("express");
const ContactController = require("./app/controllers/ContactController");
const router = Router();

router.get("/contatos", ContactController.index);
router.get("/contatos/:id", ContactController.show);

module.exports = router;
