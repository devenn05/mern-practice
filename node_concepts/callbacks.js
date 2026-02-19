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

// Import standard Node.js modules
const dns = require('dns'); // For networking/internet
const fs = require('fs');   // For hard drive access

console.log(" 1. Application Started");

// TASK A: Look up the IP address of google.com
// We pass a callback function to handle the result
dns.lookup('google.com', (err, ipAddress) => {

    // A1. Standard pattern: Check for errors first
    // If you have no internet, this 'err' will have data
    if (err) {
        console.error("Network Error! Could not find website.");
        return; // Stop here. Don't try to write the file.
    }

    // A2. If we are here, we have the data!
    console.log(`2. Network Success! Google's IP is: ${ipAddress} ---`);
    console.log("(Passing data to next task...)");

    const contentToWrite = `Target: google.com\nIP Address: ${ipAddress}\nTimestamp: ${new Date()}`;

    // TASK B: Write that specific data to a file
    // Notice: This function is INSIDE the callback of Task A
    fs.writeFile('target.txt', contentToWrite, (fileErr) => {
        
        // B1. Check for file errors (e.g., hard drive full)
        if (fileErr) {
            console.error("File System Error! Could not write file.");
            return;
        }

        // B2. Success!
        console.log("3. Disk Success! Data saved to 'target.txt'");
    });

});

console.log("4. (This prints immediately because Node is async)");