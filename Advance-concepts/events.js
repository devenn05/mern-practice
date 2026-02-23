// Basics
const { error } = require('console');
const EventEmitter = require('events');
const evm = new EventEmitter();

evm.on("firstfunc", ()=>{
    console.log("Event is fired.")
})

evm.emit("firstfunc")

// Passing Data and Arguments
const pizzaEvm = new EventEmitter();

pizzaEvm.on("order-pizza", (size, topping)=>{
    let price = 0;
    if (size === "large"){
        price = 100;
    } else if (size == "medium"){
        price = 70
    } else price = 50;

    console.log(`Order for ${size} pizza with ${topping}. Total: ${price}$`)
})

pizzaEvm.emit("order-pizza", "large", "Fried Chicken")

// .on() vs .once()
const dbEmitter = new EventEmitter();

dbEmitter.once("connected", ()=>{
    console.log("Connected Successfully!")
})

dbEmitter.emit("connected") // This will trigger
dbEmitter.emit("connected") // Ignored
dbEmitter.emit("connected") // Ignored

// Error event
const systemEmitter = new EventEmitter();

systemEmitter.on("error", (err)=>{
    console.log("We caught an error: ", err.message);
})

systemEmitter.emit("error", new Error("Fake Error!!!!!"));

// User Login system example

const authEmitter = new EventEmitter()

authEmitter.on("login", (username)=>{
    console.log(`Welcome back, ${username}.`)
})

authEmitter.emit('login', 'admin')

// Real World Implementation 
class Employee extends EventEmitter {
    constructor(){
        super();
        this.totalEmployee = 0
    }

    addEmployee(name){
        console.log("Adding Employee...")
        this.emit('add-employee', name);
        this.totalEmployee ++
        console.log(`Total Employees: ${this.totalEmployee}`);
    }
}

const employees = new Employee();
employees.on('add-employee', (name)=>{
    console.log(`${name} is added successfully!`)
})

employees.addEmployee('Deven')
employees.addEmployee('Yash')

// on vs off

const musicPlayer = new EventEmitter()

const playSong = (song)=>{
    console.log(`Now playing ${song}`)
}
musicPlayer.on('play', playSong);

musicPlayer.emit('play', 'Chemicals')
musicPlayer.emit('play', 'Color Violet')

musicPlayer.off('play', playSong);
musicPlayer.emit('play', 'Redrum') // Wont trigger 


//  Combining all of it 
class Building extends EventEmitter{
    constructor(){
        super();
    }
    detectSmoke(){
        console.log("Detected Smoke!!!!!!!")
        this.emit('fire', sprinklerSystem);
    }
}
const sprinklerSystem = ()=>{
    console.log("Sprinklers activated! Water is flowing!");
}

const lodhaHeights = new Building();
lodhaHeights.on('fire', sprinklerSystem)
lodhaHeights.detectSmoke();

lodhaHeights.off('fire', sprinklerSystem)
lodhaHeights.detectSmoke();
