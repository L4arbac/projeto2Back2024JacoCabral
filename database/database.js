const { Sequelize } = require("sequelize");
const { Client } = require("pg"); 

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || 5432;

async function ensureDatabaseExists() {
  const client = new Client({
    user: dbUser,
    host: dbHost,
    password: dbPassword,
    port: dbPort,
  });

  try {
    await client.connect();

    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname='${dbName}';`
    );

    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}";`);
      console.log(`Banco de dados "${dbName}" criado com sucesso.`);
    } else {
      console.log(`Banco de dados "${dbName}" já existe.`);
    }
  } catch (error) {
    console.error("Erro ao verificar ou criar o banco de dados:", error);
    throw error;
  } finally {
    await client.end();
  }
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: "postgres",
  port: dbPort,
  logging: false, 
});

(async () => {
  try {

    await ensureDatabaseExists();

    await sequelize.authenticate();
    console.log("Conectado ao banco de dados");

    await sequelize
      .sync({ force: false, alter: true }) 
      .then(() => {
        console.log("Tabelas sincronizadas");
      })
      .catch((err) => {
        console.error("Erro ao sincronizar tabelas:", err);
      });
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
  }
})();

module.exports = sequelize;
