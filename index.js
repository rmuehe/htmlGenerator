const model = require("./model.js");
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

app.post("/login", (request, response) => {
    let requestUsername = request.body.username;
    let requestPassword = request.body.password;

    console.log(requestPassword);

    model.checkLogin(requestUsername, requestPassword).then((results) => {
        console.log(results);
        response.sendStatus(200);
    });

    // response.sendStatus(200);
});

