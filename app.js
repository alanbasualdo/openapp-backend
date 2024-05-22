const express = require("express");
const { mongodbConn } = require("./database/mongodbConn");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

// Crear el servidor express
const app = express();

// Crear el servidor HTTP
const server = require("http").createServer(app);

// Crear la instancia de Socket.IO y pasarle el servidor HTTP
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// Importar la lógica de sockets
require("./sockets")(io);

// Conexión a la base de datos
mongodbConn();

// Para que sólo se pueda consumir la API del dominio que yo permita
app.use(cors());

// Directorio público
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Rutas

// Users
app.use("/user", require("./routes/users/userRoute"));
app.use("/auth", require("./routes/users/authRoute"));

// Sections
app.use("/companies", require("./routes/company/companies"));
app.use("/brands", require("./routes/company/brands"));
app.use("/cities", require("./routes/company/cities"));
app.use("/branches", require("./routes/company/branches"));

app.use("/areas", require("./routes/positions/areas"));
app.use("/subareas", require("./routes/positions/subareas"));
app.use("/positions", require("./routes/positions/positions"));

app.use("/pcs", require("./routes/pcs/processors"));
app.use("/pcs", require("./routes/pcs/ram"));
app.use("/pcs", require("./routes/pcs/disks"));
app.use("/pcs", require("./routes/pcs/models"));
app.use("/pcs", require("./routes/pcs/computers"));

// Tickets
app.use("/tickets", require("./routes/tickets/ticketsRoute"));
app.use("/categories", require("./routes/tickets/categoriesRoute"));

app.use("/attachments", require("./routes/attachmentsRoute"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Escuchar peticiones en el servidor HTTP
server.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
