module.exports = {
  F: process.env.F || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '1234',
  
  DB_PORT: process.env.DB_PORT || 3306,
  PORT: process.env.PORT || 3000,
  MYSQL_URL: process.env.MYSQL_URL // Correcto: sin espacio después de `process.env.`
};
