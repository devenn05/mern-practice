const crypto = require('crypto');
const catchAsync = require('./catchAsync');
require('dotenv').config();

const alogrithm = 'aes-256-cbc';
const secretKey = process.env.MASTER_KEY;

if (!secretKey || secretKey.length !== 32){
    throw new Error("CRITICAL ERROR: MASTER_KEY must be in .env and it must be exactly 32 characters long!")
}

const encrypt = (plainText) =>{

    // 1. Generate a random 16-byte IV for every single password
    // iv tands for Initializtion Vector
    const iv = crypto.randomBytes(16);

    // 2. Create the Cipher maker
    // Buffer.from() translates your human-readable MASTER_KEY (string) into a temporary chunk of raw computer memory (bytes) that the cipher machine can actually read.
    // We are creating a locking machine that uses aes-256, the secret key and a random starting spin iv
    const cipher = crypto.createCipheriv(alogrithm, Buffer.from(secretKey), iv);

    // 3. Converting the utf-8 based plain text into hex
    let encrypted = cipher.update(plainText, 'utf8', 'hex');

    // Block encryption algorithms have data in blocks of exactly 16 bytes, If your password is only 10 bytes long, the machine still has 6 bytes of "empty space" sitting inside its gears.
    // this forces the machine to add dummy data ("padding") to fill up the gears.
    encrypted += cipher.final('hex');

    // 4. Return both the IV and the encrypted text together
    return `${iv.toString('hex')}:${encrypted}`;
}

const decrypt = (encryptedData) =>{
    try{
        // 1. Split the stored string into the IV and the Encrypted Text
        const parts = encryptedData.split(':');
        const iv = Buffer.from(parts.shift(), 'hex');
        const encryptedText = Buffer.from(parts.join(':'), 'hex');
        
         // 2. Create the Decipher maker
        const decipher = crypto.createDecipheriv(alogrithm, Buffer.from(secretKey), iv);

        // 3. Decrypt back to plain text
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8')
        return decrypted;

    } catch (error){
        throw new Error("Decryption failed! Did the MASTER_KEY change?", error.message);
    }
};

module.exports = {encrypt, decrypt};