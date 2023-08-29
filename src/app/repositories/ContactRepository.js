const { uuid } = require("uuidv4");

let contacts = [
    {
        id: uuid(),
        name: "Isac Vieira",
        email: "isac@mail.com",
        phone: "123123123",
        category_id: uuid(),
    },
    {
        id: uuid(),
        name: "Taquain Maniçoba",
        email: "taquain@mail.com",
        phone: "555142416217",
        category_id: uuid(),
    },
];

class ContactRepository {
    findAll() {
        return new Promise((resolve) => {
            resolve(contacts);
        });
    }
    findById(id) {
        return new Promise((resolve) =>
            resolve(contacts.find((contact) => contact.id === id))
        );
    }
    delete(id) {
        return new Promise((resolve) => {
            contacts = contacts.filter((contact) => (contact.id = !id));
            resolve();
        });
    }
}

module.exports = new ContactRepository();
