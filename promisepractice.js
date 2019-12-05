let needToUpdate = 0;

// resolve and reject are functions, 1st: success, 2nd: failure
let myFirstPromise = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000);
});

myFirstPromise.then(() => {
    console.log("This promise was fulfilled");
}).finally(() => {
    console.log("We are done here");
});

console.log("This runs after calling the promise");

/*
let myFirstPromise = new Promise((resolve, reject) => {
    resolve();
});

function runThisFunction (myFunction) {
    setTimeout(myFunction, 2000);
}

runThisFunction(() => console.log("Hello There"));

runThisFunction(() => console.log("BYE"));
*/