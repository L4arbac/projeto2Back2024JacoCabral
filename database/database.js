const { Sequelize } = require("sequelize");

// Configuração do Sequelize com PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    logging: false, // Desativa o log das queries no console
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao banco de dados PostgreSQL com Sequelize.");
    sequelize
      .sync({ force: false ,alter:true}) // force: false não recria a tabela se já existir
      .then(() => {
        console.log("Tabelas sincronizadas com sucesso.");
      })
      .catch((err) => {
        console.error("Erro ao sincronizar tabelas:", err);
      });
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
  }
})();

module.exports = sequelize;
