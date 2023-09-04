const ContactRepository = require("../repositories/ContactRepository");
class ContactController {
    async index(request, response) {
        let contacts = await ContactRepository.findAll();
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

    async store(request, response) {
        const { name, email, phone, categoryId } = request.body;

        if (!email || !name) {
            response
                .status(400)
                .json({ Error: "E-mail and username are required" });
        }

        const contactExist = await ContactRepository.findByEmail(email);
        if (contactExist) {
            return response
                .status(400)
                .json({ Error: "Email has already registered" });
        }
        const contact = await ContactRepository.create({
            name,
            email,
            phone,
            categoryId,
        });

        return response.send(contact);
    }

    async update(request, response) {
        const { name, email, phone, categoryId } = request.body;
        const { id } = request.params;
        const contactExist = await ContactRepository.findById(id);
        if (!contactExist) {
            return response.status(400).json({ Error: "User dont exist" });
        }
        if (!email || !name) {
            response
                .status(400)
                .json({ Error: "E-mail and username are required" });
        }
        const contactByEmail = await ContactRepository.findByEmail(email);
        if (contactByEmail && contactByEmail.id !== id) {
            return response
                .status(400)
                .json({ Error: "Email has already registered" });
        }

        const contact = await ContactRepository.update(id, {
            name,
            email,
            phone,
            categoryId,
        });
        response.json(contact);
    }

    async delete(request, response) {
        const { id } = request.params;
        const contact = await ContactRepository.findById(id);
        if (!contact) {
            return response.status(404).json({ error: "User not found" });
        }
        await ContactRepository.delete(id);
        response.sendStatus(204);
    }
}
//Desing Pattern -> Singleton
//Garante que quando a classe for chamada será instanciada em memória e quando chamada novamente usará a mesma que já está em memória
module.exports = new ContactController();
