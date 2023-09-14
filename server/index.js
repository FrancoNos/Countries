const server = require("./src/server");
const { conn } = require('./src/db.js');
require("dotenv").config();
const PORT = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
  console.log('¡Se ha conectado la DB!')
server.listen(process.env.PORT, () => {
  console.log(`Server abierto en el puerto ${process.env.PORT}`);
})
}).catch(error => console.error(error))
