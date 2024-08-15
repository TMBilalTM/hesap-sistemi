import mysql from 'mysql2/promise';
const db = mysql.createPool({
  host: 'hostname',
  user: 'root',
  password: 'sifre',
  database: 'veritabanı',
  port: 20193,
});

export default db;
