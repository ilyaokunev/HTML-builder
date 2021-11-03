const path = require('path');
const fs = require('fs');

async function reader() {

let stylesArr = await fs.promises.readdir(path.join(__dirname, 'styles'));

let filtredArr = await stylesArr.filter( file => path.extname(path.join(__dirname, "styles", file)) == '.css');

let output = fs.createWriteStream(path.join(__dirname,"project-dist", 'bundle.css'));
filtredArr.forEach( fileName => {

fs.readFile(path.join(__dirname,'styles',fileName),
'utf-8',
 (err, data) => {

if (err) throw err;

output.write(`\n/*Beggining of ${fileName} file*/\n${data}`);
 });

})
}
reader();