const { Client } = require("pg");
const client = new Client({
    host: "localhost",
    port: 5432,
    user: "root",
    password: "root",
    database: "mycontacts",
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Conectado ao banco de dados");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    }
}

// Função para executar uma consulta SQL
async function Query(query) {
    try {
        const { rows } = await client.query(query);
        return rows;
    } catch (error) {
        console.error("Erro na consulta:", error);
        throw error; // Lança o erro para que seja tratado posteriormente
    }
}

connectToDatabase()
    .then(() => {
        // Chama a função Query para executar a consulta
        return Query("SELECT * FROM contacts");
    })
    .then((result) => {
        // Resultados da consulta são passados para console.log
        console.log(result);
    })
    .catch((error) => {
        console.error("Erro geral:", error);
    });
