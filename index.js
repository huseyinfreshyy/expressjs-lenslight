import express from 'express';
import dotenv from 'dotenv';
import conn from './db.js';
import cookieParser from 'cookie-parser';
import pageRouter from './routes/pageRouter.js';
import photoRouter from './routes/photoRouter.js';
import methodOverride from 'method-override';
import userRouter from './routes/userRouter.js';
import { checkUser } from './middlewares/auth.jwt.js'
import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

//Connection to the DB
conn();

const app = express();
const port = process.env.PORT

//ejs template engine
app.set("view engine", "ejs");

//middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }))
app.use(methodOverride('_method', {
    methods: ['POST', 'GET'],
}))

//routes
app.use("*", checkUser)
app.use("/", pageRouter)
app.use("/photos", photoRouter)
app.use("/users", userRouter)

app.listen(port, () => {
    console.log(`Server listening to port: ${port}`)
})

export default app;
