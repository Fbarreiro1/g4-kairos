module.exports = {
  F: process.env.F || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '1234',
  DB_NAME: process.env.DB_NAME || 'clinica_db',
  DB_PORT: process.env.DB_PORT || 3306,
  PORT: process.env.PORT || 3000,
  MSQUL_URL: process.env.MSQUL_URL // Correcto: sin espacio después de `process.env.`
};
