export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database_url: process.env.DATABASE_URL || 'mongodb://localhost/Invocraft',
  database_name: process.env.DATABASE_NAME || 'Invocraft',
  jwt_secret: process.env.JWT_SECRET,
});
