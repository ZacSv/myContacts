const routes = require("./routes");
require("express-async-errors");

const express = require("express");

const app = express();
app.use(express.json());
app.use(routes);
app.use((error, request, response, next) => {
    console.log(error);
    response.sendStatus(500);
});
app.listen(3000, () =>
    console.log("Servidor rodando em http://localhost:3000")
);
