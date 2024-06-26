const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");

require("./db.js");

const server = express();

server.name = "WearFashion";

server.use((req, res, next) => {
  // Redirige las solicitudes con una barra diagonal al final
  if (req.url.substr(-1) === "/" && req.url.length > 1) {
    const query = req.url.slice(req.url.length);
    res.redirect(301, req.url.slice(0, -1) + query);
  } else {
    next();
  }
});

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));

// Solo utiliza el middleware cors()
server.use(
  cors({
    origin: ["http://localhost:5173", "https://wearfashion.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  })
);

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
