import express from "express"
// const express = require('express');
const app = express();
const port = 29933;
const http = require('http');
const server = http.createServer(app);

app.get("/",(req: express.Request, res: express.Response)=>{
    res.send("Hello world");
})

server.listen(port,()=>{
    console.log("Server is running on port ", port);
})





