const swaggerUI = require('swagger-ui-express')
const generatedDocsJson = require("../docs/swagger-schema.json");
const initializeSwaggerUi = function (app, port) {
    app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(generatedDocsJson));
}

module.exports = initializeSwaggerUi;