const { uuid } = require("uuidv4");

const contacts = [
    {
        id: uuid(),
        name: "Isac Vieira",
        email: "isac@mail.com",
        phone: "123123123",
        category_id: uuid(),
    },
];

class ContactRepository {
    findAll() {
        return contacts;
    }
}

module.exports = new ContactRepository();
