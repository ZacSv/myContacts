const db = require("../../database/indexDT");
class CategoryRepository {
    async findAll() {
        const rows = await db.Query(`
        SELECT * FROM categories ORDER BY name
        `);
        return rows;
    }
    async findByName(name) {
        const [row] = await db.Query(
            "SELECT * FROM categories WHERE name = $1",
            [name]
        );
        return row;
    }
    async findById(id) {
        const [row] = await db.Query("SELECT * FROM categories WHERE id = $1", [
            id,
        ]);
        return row;
    }
    async create({ name }) {
        const [row] = await db.Query(
            `INSERT INTO categories(name)
        VALUES ($1)
        RETURNING*
        `,
            [name]
        );
        return row;
    }
    async update(id, { name }) {
        const [row] = await db.Query(
            `
        UPDATE categories
        SET name = $1
        WHERE id = $2
        RETURNING*

        `,
            [name, id]
        );
    }
    async delete(id) {
        const deleteOp = await db.Query(
            `
        DELETE FROM categories
        WHERE id = $1
        `,
            [id]
        );
    }
}
module.exports = new CategoryRepository();
