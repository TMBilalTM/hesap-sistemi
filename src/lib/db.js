import mysql from 'mysql2/promise';
const db = mysql.createPool({
  host: 'viaduct.proxy.rlwy.net',
  user: 'root',
  password: 'DEQkJsYHMmpiljxqnwTQPQNdJtZIFOvu',
  database: 'railway',
  port: 20193,
});

export default db; 
