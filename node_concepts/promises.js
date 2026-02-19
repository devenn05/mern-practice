// Simulating a Coin Toss
const flipCoin = new Promise((resolve, reject)=>{
    const isHeads = Math.random() > 0.5;
    setTimeout(()=>{
        if (isHeads) resolve("Heads!");
        else reject("Tails");
    });
})

flipCoin.then((message)=>{
    console.log("Success: " + message);
}).catch((error)=>{
    console.log("Error: " + error)
})

// Simulating a real world example
function checkDatabase(username){
    return new Promise((resolve, reject)=>{
        if (username === "admin"){
            resolve({id: 1, name: "admin", role: "Intern"})
        } else reject("NOT FOUND")
    })
}

checkDatabase("admin").then((userdata)=>{
    console.log("Name: "+ userdata.name);
}).catch((error)=>{
    console.log("Error, "+ error);
}).finally(()=>{
    console.log("Process finished.")
})