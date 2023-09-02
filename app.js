import express from 'express';
import dotenv from 'dotenv';
import conn from './db.js';
import pageRouter from './routes/pageRouter.js';
import photoRouter from './routes/photoRouter.js';

dotenv.config();

const app = express();
const port = process.env.PORT

conn();

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/", pageRouter)
app.use("/photos", photoRouter)


app.listen(port, () => {
    console.log(`Server listening to port: ${port}`)
})
