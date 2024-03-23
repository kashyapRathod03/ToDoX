require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const router = require("./Routes/router");
const PORT = process.env.PORT || 6010;
const fs = require('fs');
const path = require('path');


app.use(cors({
    origin:["http://localhost:3000","https://workforcehub-mxm0.onrender.com"],
    credentials: true,
    // origin: process.env.CLIENT_URL,
  }));
app.use(express.json());
app.use("/uploads",express.static("./uploads"));
app.use("/files",express.static("./public/files"));

app.use(router);

app.use(express.static(path.join(__dirname,"./frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"./frontend/build/index.html"))
});


app.listen(PORT,()=>{
    console.log(`Server start at port no ${PORT}`)
})