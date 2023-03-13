const express = require("express"); //Import all packages
const path = require("path");
const fileupload = require("express-fileupload");

let initial_path = path.join(__dirname, "public"); //Store "public" folder's path to this variable

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get("/", (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
});


app.get("/edit", (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
});

//upload link 
app.post("/upload", (req, res) => {
    let file = req.files.image;
    let date = new Date(); //Date object can name up;oaded image with timestamp
    //image name 
    let imagename = date.getDate() + date.getTime() + file.name;
    //image upload path 
    let path = "public/uploads/" + imagename;

    //create upload
    file.mv(path, (err, result) => { //To create the upload
        if (err) {
            throw err;
        } else {
            //loaded image path
            res.json(`uploads/${imagename}`) //send uploaded image path
        }
    });
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(initial_path, "dashboard.html"));
});

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
});


app.use((req, res) => {
    res.json("404");
});


app.listen("3000", () => {
    console.log("Listening on port 3000");
})