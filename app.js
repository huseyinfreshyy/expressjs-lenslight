import express from 'express';
import dotenv from 'dotenv';
import conn from './db.js';

dotenv.config();

const app = express();
const port = process.env.PORT

conn();

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/about", (req, res) => {
    res.render("about")
})

app.listen(port, () => {
    console.log(`Server listening to port: ${port}`)
})
