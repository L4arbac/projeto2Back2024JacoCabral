const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CAFE API',
    description: 'API para loja de café',
    version: '1.0.0'
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swaggerCode.json';

const endpointsFiles = [
    './routes/CafeRoutes.js',  
    './routes/IngredienteRoutes.js',
    './routes/InstallRoutes.js',
    './routes/UserRoutes.js',
    './routes/VendaRoutes.js'
];


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./index'); 
});
