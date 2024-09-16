const fs = require('fs');

function getAllFilesFromDirectory(directory){
    let fileNames = [];
    fs.readdirSync(directory).forEach(file => {
        const filePath = `${directory}/${file}`;
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
            fileNames.push(filePath);
        } else if (stats.isDirectory()) {
            fileNames = fileNames.concat(getAllFilesFromDirectory(filePath));
        }
    });
    return fileNames;
}



module.exports = {
    getAllFilesFromDirectory
}