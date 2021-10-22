/*********************************************************************************
*  Full Stack Javascript – QAP2
*  I declare that this assignment is my own work in accordance with Keyin Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Erin Slaney Date: October 21, 2021
*
*  Online (Heroku) Link: ________________________________________________________
*
********************************************************************************/ 

const express = require("express");
var path = require("path");
const app = express();
const data = require("./data-service.js");

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "views/home.html"));

});

app.get("/about",(req,res)=>{
    res.sendFile(path.join(__dirname, "views/about.html"));

});

app.get("/employees", (req,res) => {
    data
    .getAllEmployees()
    .then((data) => res.json(data))
    .catch((err) => {
        res.send(err);
    });
});

app.get("/managers", (req,res)=>{
    data.getManagers().then((data)=>res.json(data)).catch((err)=>{
        res.send(err);
    });
});

app.get("/departments", (req,res)=>{
    data.getDepartments().then((data)=>res.json(data)).catch((err)=>{
        res.send(err);
    });
});

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname, "views/error404.html"));
});


data.initialize().then(()=>{
    app.listen(HTTP_PORT, function () {
        console.log("Server Running on Port 8080!");
});
   
}).catch((err)=>{
    console.log("Unable to start server!" + err)
});
