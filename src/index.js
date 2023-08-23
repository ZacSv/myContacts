const express = require('express');
const users = require('../mocks/users');

const app = express();
const user = JSON.stringify(users);
app.get('/', (request, response) => response.send('Olá boboca'));
app.get('/users', (request, response) => response.send(user));

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
