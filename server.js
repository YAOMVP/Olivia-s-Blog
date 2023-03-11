const express = require("express"); //Import all packages
const path = require("path");

let initial_path = path.join(__dirname, "public"); //Store "public" folder's path to this variable

const app = express();
app.use(express.static(initial_path));


app.get("/", (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
});