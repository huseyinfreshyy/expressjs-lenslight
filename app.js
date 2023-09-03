import express from 'express';
import dotenv from 'dotenv';
import conn from './db.js';
import cookieParser from 'cookie-parser';
import pageRouter from './routes/pageRouter.js';
import photoRouter from './routes/photoRouter.js';
import userRouter from './routes/userRouter.js';
import { checkUser } from './middlewares/auth.jwt.js'

dotenv.config();

//Connection to the DB
conn();

const app = express();
const port = process.env.PORT

//ejs template engine
app.set("view engine", "ejs");

//middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//routes
app.get("*", checkUser)
app.use("/", pageRouter)
app.use("/photos", photoRouter)
app.use("/users", userRouter)

app.listen(port, () => {
    console.log(`Server listening to port: ${port}`)
})
