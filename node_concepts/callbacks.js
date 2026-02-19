// 1. setTimeout (The simplest Async)
console.log("Started...");

setTimeout(()=>{
    console.log("waiting for 4seconds....");
}, 4000);

console.log("4 seconds completed.")

// ---------------------------------------------------------------------------------
// Callbacks - Easy
// ---------------------------------------------------------------------------------

function dummyFunc(userInput){
    console.log("Dummy function executed with "+ userInput);
}

function mainFunc(num1, num2, func){
    const sum = num1 + num2;
    return func(sum);
}

mainFunc(1,1, dummyFunc);

// ---------------------------------------------------------------------------------
// Callbacks - Medium (Introducing time)
// ---------------------------------------------------------------------------------

function dummyFunc2(userInput){
    console.log("Dummy function executed with "+ userInput.name);
}

function loadUser(func){
    setTimeout(()=>{
        const user = {id: 1, name: "dev"}; 
        dummyFunc2(user)
    }, 2000);
}

loadUser(dummyFunc);
 
// ---------------------------------------------------------------------------------
// Callbacks - Real time example
// ---------------------------------------------------------------------------------


const dns = require('dns'); 
const fs = require('fs');   

console.log(" 1. Application Started");

// TASK A: Look up the IP address of google.com
dns.lookup('google.com', (err, ipAddress) => {

    if (err) {
        console.error("Network Error! Could not find website.");
        return;
    }

    console.log(`2. Network Success! Google's IP is: ${ipAddress} ---`);
    console.log("(Passing data to next task...)");

    const contentToWrite = `Target: google.com\nIP Address: ${ipAddress}\nTimestamp: ${new Date()}`;

    // TASK B: Write that specific data to a file
    fs.writeFile('target.txt', contentToWrite, (fileErr) => {
        
        // B1. Check for file errors (e.g., hard drive full)
        if (fileErr) {
            console.error("File System Error! Could not write file.");
            return;
        }

        console.log("3. Disk Success! Data saved to 'target.txt'");
    });

});

console.log("4. (This prints immediately because Node is async)");