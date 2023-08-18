const DbComponent = require("./src/DbComponent");
const config = require("config");
const checkFile = require("./src/utils/checkFile");

/**
 * A singleton insance of DBComponent
 * @module DBComponent
 * @instance
 */
const instance = new DbComponent(config.get("DBConnection.default"));

const shareSentences = checkFile(config.get("sharedSentences"));
if(shareSentences) instance.setSharedSentences(shareSentences);
module.exports = instance;
