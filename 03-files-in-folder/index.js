const path = require('path');
const fs = require('fs');


let  folderPath = path.join(__dirname,'secret-folder');


async function filesGetter() {
  let fileNamesArr = await fs.promises.readdir(folderPath, {withFileTypes: true});

let filtredArr = fileNamesArr.filter(file => file.isFile());

 filtredArr.forEach( element => {

   let filePath = path.join(folderPath, element.name);

   let fileName = path.basename(filePath).split('.');
   fileName = fileName.splice(fileName.length-2,1).join('.');

    let fileExt = path.extname(filePath).slice(1);

    fs.stat(filePath, function (err, stats) {
          let size = stats.size/1024;

         console.log(`${fileName} - ${fileExt} - ${size}kb`);
        });
});

}

filesGetter();