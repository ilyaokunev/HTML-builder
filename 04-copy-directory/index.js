const path = require('path');
const fs = require('fs');
const { copyFile } = fs;


fs.mkdir(path.join(__dirname, 'files-copy'),{ recursive: true }, err => {
    if (err) throw err;
});


async function copyFiles() {

    let filesNamesCopies = await fs.promises.readdir( path.join(__dirname, 'files-copy') );

   await filesNamesCopies.forEach( fileName => {

      fs.unlink(path.join(__dirname, "files-copy", fileName), 
         err => {
            if (err) throw err;
        }  );
    
    });

let filesNames = await fs.promises.readdir( path.join(__dirname, 'files') );

filesNames.forEach( fileName => {

    copyFile(path.join(__dirname, "files", fileName), 
    path.join(__dirname, "files-copy", fileName),
     err => {
        if (err) throw err;
    }  );  

})
}; 

copyFiles()