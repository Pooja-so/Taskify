const express = require("express");
const { app, server } = require("./socket");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const app = express();
require("./db/mongoose");
const port = process.env.PORT;

app.use(
  cors({
    origin: `http://localhost:5173`,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

server.listen(port, () => {
  console.log("Server is on at port", port, "!!!");
});
// app.listen(port, () => {
//   console.log("Server is on at port", port, "!!!");
// });

module.exports = app;
