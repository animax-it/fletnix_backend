const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");
require("dotenv").config();
const routesAuth = require("./routes/auth");
const routesMovies = require("./routes/movies");
connectToMongo();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

// Available routes

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/movies"));

app.use("/api/auth", routesAuth);
app.use("/api/movie", routesMovies);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("listening app at", `http://localhost:${port}`);
});
