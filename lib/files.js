const path = require('path');
const fs = require('fs');

module.exports = {
    getCurrentDirectoryBase : () =>{
        return path.basename(process.cwd());
    },
    directoryExists : (filePath) =>{
        try{
            return fs.statSync(filePath).isDirectory();
        } catch (err){
            return false;
        }
    }
}