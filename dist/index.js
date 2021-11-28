"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// const express = require('express');
var app = (0, express_1.default)();
var port = 29933;
var http = require('http');
var server = http.createServer(app);
app.get("/", function (req, res) {
    res.send("Hello world");
});
server.listen(port, function () {
    console.log("Server is running on port ", port);
});
//# sourceMappingURL=index.js.map