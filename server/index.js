const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = process.env.PORT || 3001;

conn.sync({ force: false }).then(() => {
  console.log('¡Se ha conectado la DB!')
server.listen(PORT, () => {
  console.log(`Server abierto en el puerto ${PORT}`);
})
}).catch(error => console.error(error))
