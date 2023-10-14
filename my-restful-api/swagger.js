const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Homework 9',
      version: '1.0.0',
      description: 'Dokumentasi API untuk proyek ini',
    },
  },
  apis: ['./app.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
