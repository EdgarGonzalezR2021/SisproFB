import sql from "mssql";
import config from "../config";

export const dbSettings = {
  user: config.dbUser,
  password: config.dbPassword,
  server: config.dbServer,
  database: config.dbDatabase,
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

/* Oficial */
export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};



/* para pruebas: si se ejecuta esta funcion quiere decir que si se conecta a la base de datos getConnection()
export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    const result = await pool.request().query("SELECT 1");
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

getConnection();
*/

export { sql };
