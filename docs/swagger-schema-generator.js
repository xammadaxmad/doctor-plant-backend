const swaggerAutogen = require('swagger-autogen')();
const fileHelper = require("../utils/file-helper")

const doc = {
    info: {
        title: 'POS API Documentation',
        version: '1.0.0',
        description: 'API for managing Point-of-Sale operations',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};



const outputFile = './swagger-schema.json';
const endpointsFiles = fileHelper.getAllFilesFromDirectory("./routes/"); // Add other route files if needed


swaggerAutogen(outputFile, endpointsFiles, doc).then(respone =>{
    if(respone.success){
        console.log(`Documentation generated at ${outputFile}`);
    }
    else{
        console.error('Failed to generate documentation:', response.error);
    }
})
