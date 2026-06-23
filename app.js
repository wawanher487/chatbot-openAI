require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("public"));

const chatRoutes = require("./src/routes/chatRoutes");

app.use("/", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
