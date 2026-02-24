// Readable streams
const fs = require('fs');
// const readStream = fs.createReadStream('./story.txt', {highWaterMark: 5});
// readStream.on('data', (chunk)=>{
//     console.log(chunk.toString());
// });
// readStream.on('end',()=>{
//     console.log('Done!');
// });

// // Writable streams
// const writeStreams = fs.createWriteStream('./output.txt');
// writeStreams.write("Hello, this is chunk One\n");
// writeStreams.write("Hello, this is chunk Two\n");
// writeStreams.end('Final Chunk!!\n');

// writeStreams.on('finish', ()=>{
//     console.log("Done!!!")
// })

// const writeStreamsExtend = fs.createWriteStream('./output.txt', {flags: 'a'});
// writeStreamsExtend.write('Welcome back, this is Fourth Chunk. All for of them will be going into the Story!');
// writeStreamsExtend.on('finish', ()=>{
//     console.log('Done!!')
// })


// // Combining Read and write (Pipe)  
// const readStreamsOG = fs.createReadStream('./output.txt');
// const writeStreamOG = fs.createWriteStream('./story.txt', { flags: 'a' });

// readStreamsOG.pipe(writeStreamOG)

// // A File Transformer Logging System without pipe
// const readableStream = fs.createReadStream('./input.txt', {highWaterMark: 16});
// const writableStream = fs.createWriteStream('./backup.txt');

// let chunkCounter = 0;

// readableStream.on('data', (chunks)=>{
//     writableStream.write(chunks);
//     chunkCounter ++;
// })

// readableStream.on('end', ()=>{
//     console.log("END")
// })

// Transform Streams

const {Transform} = require('stream');

const reader = fs.createReadStream('./story.txt')
const writer = fs.createWriteStream('./output.txt')

const uppercaseFilter = new Transform({
    transform(chunk, encoding, callback){
        const upperText = chunk.toString().toUpperCase();
        callback(null, upperText);
    }
})

reader.pipe(uppercaseFilter).pipe(writer);