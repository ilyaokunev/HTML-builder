const path = require('path');
const fs = require('fs');

let fileLocation = path.join(__dirname, 'text.txt');

let readStream = fs.createReadStream(fileLocation, 'utf-8');

let result ='';

readStream.on('data', data => result += data );

readStream.on('end', () => process.stdout.write(result));

