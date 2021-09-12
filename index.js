const express = require('express');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const routes = require('./src/routes');

require('dotenv').config({
    path: './env/.env'
});

const port = 8080;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'A simple Express Library API'
        },
        servers: [
            {
                url: 'http://localhost:8080'
            }
        ]
    },
    apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
});
