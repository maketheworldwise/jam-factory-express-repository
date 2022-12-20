import mysql from 'mysql2/promise';
import 'dotenv/config';

const dataSource: mysql.Pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  multipleStatements: true,
});

export default dataSource;
