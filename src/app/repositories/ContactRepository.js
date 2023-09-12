const db = require("../../database/indexDT");
class ContactRepository {
    //Define que se não for passado o query param "orderBy" por padrão a ordenação será ASCENDENTE
    async findAll(orderBy = "ASC") {
        //Burla a vulnerabilidade de SQL Injection garantingo que os parâmetros sejam somente ASC ou DESC
        const direction = orderBy.toUpperCase() === "DESC" ? "DESC" : "ASC";
        const rows = await db.Query(
            `SELECT * FROM contacts ORDER BY name ${direction}`
        );
        return rows;
    }
    async findById(id) {
        const [row] = await db.Query("SELECT * FROM contacts WHERE id = $1", [
            id,
        ]);
        return row;
    }
    async findByEmail(email) {
        const [row] = await db.Query(
            "SELECT * FROM contacts WHERE email = $1",
            [email]
        );
        return row;
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

    async update(id, { name, email, phone, categoryId }) {
        const [row] = await db.Query(
            `
        UPDATE contacts
        SET name = $1, email = $2, phone = $3, categoryId = $4
        WHERE id = $5
        RETURNING *
        `,
            [name, email, phone, categoryId, id]
        );

        return row;
    }

    async delete(id) {
        const deleteOp = await db.Query(
            `
       DELETE FROM contacts
       WHERE id = $1`,
            [id]
        );
        return deleteOp;
    }
}

module.exports = new ContactRepository();
