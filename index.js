const auth = require("./assets/auth.js");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const port = 3000;
http.listen(port);
console.log("Express server running on port " + port);
console.log(auth.getDBURL());

// routes
app.use(express.static("client/"));
// Needed to read data sent through POST request.
app.use(bodyParser.json());
// Gives Body Parser specific options to run off of.
app.use(bodyParser.urlencoded({extended: false}));

app.post("/login", (req, res) => {
    let requestUsername = req.body.username;
    let requestPassword = req.body.password;

    console.log(requestUsername, requestPassword);

    res.sendStatus(200);
});

