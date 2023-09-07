const { uuid } = require("uuidv4");
const db = require("../../database/indexDT");

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
    findByEmail(email) {
        return new Promise((resolve) =>
            resolve(contacts.find((contact) => contact.email === email))
        );
    }
    delete(id) {
        return new Promise((resolve) => {
            contacts = contacts.filter((contact) => contact.id !== id);
            resolve(contacts);
        });
    }
    async create({ name, email, phone, categoryId }) {
        //Cria uma nova linha no banco de dados;
        const [row] =
            //Insere dentro da tabela contacts os parâmetros entre parênteses;
            await db.Query(
                `INSERT INTO contacts(name, email, phone, categoryId)
                 VALUES($1, $2, $3, $4)
                 RETURNING * `,
                [name, email, phone, categoryId]
                //Os cifrões indicam 'binds' do PG, itens que serão substituidos pelos itens que estão dentro do array;
            );
        return row;
    }

    update(id, { name, email, phone, categoryId }) {
        return new Promise((resolve) => {
            const updatedContact = {
                id,
                name,
                email,
                phone,
                categoryId,
            };
            contacts = contacts.map((contact) =>
                contact.id === id ? updatedContact : contact
            );

            resolve(updatedContact);
        });
    }
}

module.exports = new ContactRepository();
