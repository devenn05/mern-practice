const {Transform} = require('stream');
const {decrypt} = require('./cryptoHelper');

// Class (_transform) picks it up.
// It checks if it needs to put a sign at the start (isHeaderWritten).
// It unlocks the secret password inside the object (decrypt).
// It turns the object into a text string string ("App,User,Pass").
// It places that string back on the belt (callback) to be downloaded by the browser.

class JSONToCSVTransfrom extends Transform{
    constructor(){
        // objectMode: true tells the stream Don't crash if you receive a JavaScript Object. Treat the whole object as one 'chunk'
        super({objectMode: true});
        this.isHeaderWritten = false;
    }

    _transform(chunk, encoding, callback){
        try{
            let output = ''
            if (!this.isHeaderWritten){
                output += 'App Name, Username, Password\n'
            }
            const plainPassword = decrypt(chunk.encryptedPassword);
            output += `${chunk.appName}, ${chunk.username}, ${plainPassword}`;
            callback(null, output);
        } catch(err){
            callback(err)
        }
    }
}

module.exports = JSONToCSVTransfrom;