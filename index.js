const DbComponent = require("./src/DbComponent");
const config = require("config");

/**
 * A singleton insance of DBComponent
 * @module DBComponent
 * @instance
 */
const instance = new DbComponent(config.get("DBConnection.default"));

module.exports = instance;
