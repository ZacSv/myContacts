const ContactRepository = require("../repositories/ContactRepository");
class ContactController {
    async index(request, response) {
        const contacts = await ContactRepository.findAll();
        response.json(contacts);
    }

    async show(request, response) {
        const { id } = request.params;
        const contact = await ContactRepository.findById(id);
        if (!contact) {
            return response.status(404).json({ error: "User not found" });
        }
        response.json(contact);
    }

    store() {}

    update() {}

    delete() {}
}
//Desing Pattern -> Singleton
//Garante que quando a classe for chamada será instanciada em memória e quando chamada novamente usará a mesma que já está em memória
module.exports = new ContactController();
