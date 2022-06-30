const express = require('express');
const app = express();
const port  = process.env.PORT || 5000;

const cors = require('cors');

app.use(express.json());

app.use(cors());
app.use(express.json());









app.get("/", (req, res) => {
    res.send("Job-Task project is Running")
})

app.listen(port, ()=>{
    console.log('Job-Task project is Listening')
})