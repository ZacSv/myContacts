const ContactRepository = require("../repositories/ContactRepository");
class ContactController {
    index(request, response) {
        const contacts = ContactRepository.findAll();
        response.json(contacts);
    }

    show() {}

    store() {}

    update() {}

    delete() {}
}
//Desing Pattern -> Singleton
//Garante que quando a classe for chamada será instanciada em memória e quando chamada novamente usará a mesma que já está em memória
module.exports = new ContactController();
