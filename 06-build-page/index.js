
const { EventEmitter } = require('stream');

const {readFile} = require('fs/promises');

const emitter = new EventEmitter();

const path = require('path');
const fs = require('fs');


const PrDistPath = path.join(__dirname, 'project-dist');

fs.mkdir(PrDistPath, { recursive: true }, err => {
    if(err) throw err;
});

async function HTMLCreator() {

const components = [];

const componentsList = await fs.promises.readdir(path.join(__dirname,'components'));

for ( elem of componentsList) {

let [name, extention] = elem.split('.');

let filePath = path.join(__dirname,'components',elem);

let stat = await fs.promises.stat(filePath);

if (extention == "html" && stat.isFile()) {

  let data = await readFile(filePath, 'utf-8', err => {
if (err) throw err;

        }); 
        components.push({name, data });
    }

};

HTMLReplacer(components);
};


async function HTMLReplacer(components) {

 let oldHtml = await readFile(path.join(__dirname,'template.html'),'utf-8', err => {

        if(err) throw err;
    });

for ( elem of components) {
    oldHtml = oldHtml.replace(`{{${elem.name}}}`,`${elem.data}`);
};

fs.writeFile(path.join(PrDistPath,'index.html'), oldHtml, err => {
    if (err) throw err;
})


};




async function CSSCreator() {

const stylesArr = await fs.promises.readdir(path.join(__dirname,'styles'));

const filtredArr = stylesArr.filter( file => path.extname(path.join(__dirname, "styles", file)) == '.css');

let output = await fs.createWriteStream(path.join(__dirname,'project-dist',"style.css"));

filtredArr.forEach ( elem => {

fs.readFile((path.join(__dirname,'styles',elem)),'utf-8' ,(err, data) => {

if(err) throw err;

output.write(data);

});

})

}

HTMLCreator();
CSSCreator();


