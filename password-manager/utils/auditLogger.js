const fs = require('fs');
const EventEmitter = require('events');
const path = require('path');

class AuditLogger extends EventEmitter{
    constructor(){
        super();
        this.logStream = fs.createWriteStream(path.join(__dirname, '../audit.log'), {flags: 'a'});
        this.on('log', (action, user, appName)=>{
            this.writeLog(action, user, appName);
        })
    }
    writeLog(action,user, appName){
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ACTION: ${action} | USER: ${user} | APP: ${appName}\n`;
        this.logStream.write(logMessage);

        process.nextTick(()=>{
            console.log('Audit Log written to buffer successfully.')
        });
    };
}

module.exports = new AuditLogger();