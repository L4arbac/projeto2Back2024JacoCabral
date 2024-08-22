const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CAFE API',
    description: 'API para loja de café',
    version: '1.0.0' // Adicione a versão para maior clareza
  },
  host: 'localhost:3000',
  schemes: ['http'],

  // Adicione um `basePath` se necessário, por exemplo: `basePath: '/'`
};

const outputFile = './swaggerCode.json';

// Certifique-se de que o caminho dos arquivos de rota está correto
const endpointsFiles = [
    './routes/CafeRoutes.js',  
    './routes/IngredienteRoutes.js',
    './routes/InstallRoutes.js',
    './routes/UserRoutes.js',
    './routes/VendaRoutes.js'
];

// Gere a documentação Swagger
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./index'); // Substitua './index' pelo arquivo principal da sua aplicação
});
