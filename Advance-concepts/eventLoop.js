setInterval(()=>{console.log("Set Interval, will keep executing after certain times!")}, 20000)
setImmediate(()=>console.log("Set Immediate, will execute at the end."))
setTimeout(()=>{console.log("Timer Queue, should run Fourth.")},0);
Promise.resolve().then(()=> console.log("Microtask, Should run after Microtask nextTick comes Third."))
process.nextTick(()=> console.log("Microtask Queue, This is Highest priority should run second."));
console.log("Synchronous task, This will run first.")