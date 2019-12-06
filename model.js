const auth = require("./assets/auth.js");
const mongoose = require("mongoose");
const md5 = require("md5");
// let authenticated = -1;

// Taken from mongo.js...
// Additional options when connecting to MongoDB.
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};

mongoose.connect(auth.getDBURL(), options, (error) => {
    if (error) {
        console.log("Something happened at MongoDB HQ: " + error.reason);
    } else {
        console.log("Connected to MongoDB Atlas");
    }

    
});

let db = mongoose.connection;
// Error for any problem sending/receiving data from DB
db.on("error", console.error.bind(console, "MongoDB connection Error: "));

mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;

let accountSchema = new Schema({
    fname: String,
    lname : String,
    username: String,
    email: String,
    password: String,
    creationDate: Date,
    lastLogin: Date,
    projectID: String
});

let accountModel = new mongoose.model("accounts", accountSchema);

async function checkLogin(username, password) {
    let hashedAndSaltedPassword = md5(password + auth.getSalt());
    console.log(hashedAndSaltedPassword);
    // let authenticated = -1;

    let searchCriteria = {
        username: username,
        password: hashedAndSaltedPassword
    };
    // .exec() makes it into a promise
    // executes the model..
    return accountModel.find(searchCriteria).exec();
}

async function createAccount (newAccount) {

    // let returnValue = null;
    // FIX
    return checkLogin(newAccount.username, newAccount.password).then((results) => {
        if (results.length >= 1) {
            return null;
        } else {
            let account = new accountModel({
                fname: newAccount.fname,
                lname : newAccount.lname,
                username: newAccount.username,
                email: newAccount.email,
                password: md5(newAccount.password + auth.getSalt()),
                creationDate: new Date(),
                lastLogin: new Date(),
                // ** make a method to check for repeated IDs
                projectID: Math.floor((Math.random() * 1000000) + 1)
            });
            // FIX
            return account.save();
        }
    });

    // returnValue = account.save();
    // let account = new accountModel({
    //     fname: newAccount.fname,
    //     lname : newAccount.lname,
    //     username: newAccount.username,
    //     email: newAccount.email,
    //     password: md5(newAccount.password + auth.getSalt()),
    //     creationDate: new Date(),
    //     lastLogin: new Date(),
    //     // ** make a method to check for repeated IDs
    //     projectID: Math.floor((Math.random() * 1000000) + 1)
    // });

    // returns a promise object ... don't need to exec()
    // return account.save();

    return returnValue;
}
    /*
    accountModel.find(searchCriteria, (error, results) => {
        if (error) {
            console.log(error.reason);
        } else {
            if (results.length === 0) {
            // console.log("Wrong username or password");
            // this.authenticated = 1;
                updateAuthentication(false);
            } else if (results.length === 1) {
                // console.log("Successfully Logged In");
                //this.authenticated = 0;
                updateAuthentication(true);
            } else {
                // console.log("We have two entries that match the username and password, this is a DB issue!");
                //this.authenticated = -1;
                updateAuthentication(-1);
            }
        }
    }).then(() => {
        return authenticated;
    });
    // return this.authenticated;
    return authenticated;

    */


// function updateAuthentication(value) {
//     authenticated = value;
// }

module.exports = {
    checkLogin: checkLogin,
    createAccount: createAccount
}