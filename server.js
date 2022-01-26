const express = require("express");
const connectDB = require("./database");
const morgan = require("morgan");
const cors = require("cors"); // Protocolo de conexión segura
const { readdirSync } = require("fs"); // Lectura dinamica de directorios
//const bodyParser = require("body-parser"); deprecated node >12
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

// app-server
const app = express();

// db-connection
connectDB();

// middlewares-server
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes middlewares-fs option 2 (optime)
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// port
const port = process.env.PORT || 8000;

// listen
app.listen(port, () => console.log(`Server is running on port ${port}`));