const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');

require('dotenv').config({
    path: './env/.env'
});

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});

