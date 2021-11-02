
const path = require('path');
const fs = require('fs');

const EventEmitter = require('events');

let output;

let txt ='';

let emitter = new EventEmitter();

let fileLocation = path.join(__dirname, "text.txt");

fs.access(fileLocation, err => {

if (!err) {
    fs.readFile(fileLocation, (err, data) => {
        txt = data.toString();
        emitter.emit('l');  
        })
} else {
    emitter.emit('l');
}
 
});



emitter.on('l', () => {
    process.stdout.write('Please, type your text here\n');
    output = fs.createWriteStream(fileLocation, 'utf-8');
process.stdin.emit('data', txt);
});


process.on('SIGINT',
 () => {
    process.stdout.write('Goodbye!');
    process.exit();
} );


process.stdin.on('data', data => {

    if(data.toString().trim() !== "exit") {
        output.write(data);
    } else {
        process.stdout.write('Goodbye!');
        process.exit();
    }
}
    );




