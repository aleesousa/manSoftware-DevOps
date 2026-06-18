const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API - Sistema de Monitoria',
    description: 'API para gerenciamento de monitoria de alunos',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
