const {cwd} = require("node:process");
const {join} = require("node:path");

/**
 * Returns the required file or return false if the file doesn't exists. 
 * @param {string} fileName
 */
function checkFile(fileName){
    try {
        return require(join(cwd(), fileName));
    } catch (e) {
        if (e.code === "ENOENT") {
            return false;
        }
        throw e;
    }
}

module.exports = checkFile;
