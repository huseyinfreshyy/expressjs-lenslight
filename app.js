import express from 'express';

const app = express();
const port = 3000

app.get("/", (req,res)=>{
    res.send("MUHAMMED")
})

app.listen(port, () => {
    console.log(`Server listening to port: ${port}`)
})
