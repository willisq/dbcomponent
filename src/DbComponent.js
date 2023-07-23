
/**
 * @author Jubert Perez <jubertperez@gmail.com>
 * @class DbComponent
 * @description Allows runing sql queries by using a connection pool
 */
class DbComponent {
  constructor(options) {
    const { Pool } = require("pg");
    this.pool = new Pool(options);
  }

  /**
   * Close the current connection pool and starts a new database connection
   * @param {object} options - DB connections options
   * @param {string} options.user
   * @param {string} options.password
   * @param {string} options.host
   * @param {string} options.port
   * @param {string} options.database - database name
   * @param {boolean} options.ssl
   * @param {number} options.idleTimeoutMillis
   * @param {number} options.waitFoeAvailableTimeoutMillis
   * @param {number} options.connectionTimeoutMillis
   */
  changePool(options) {
    this.pool.end();
    this.pool = new Pool(options);
    this.options = options;
    return this;
  }

  /**
  * @description Sets the json with sql queries
  * @param {JSON} jsonSentences - JSON with sql sentences   
  * @returns {DbComponent} this object
  */
  setSentences(jsonSentences) {
    this.sentences = jsonSentences;
    return this;
  }

  /**
  * @async 
  * @description Runs the sql query inside the JSON sentences and returns the result set object.
  * @param {string} idSentence - Query id inside on json sentences
  * @param {any[]} [params] - Array of params used by the query
  * @returns {Promise<object>}  A promise that contains the result set object when fulfilled.
  */
  async execute(idSentence, params = []) {
    try { return await this.pool.query(this.getSentence(idSentence), params); }
    catch (e) { return await Promise.reject(e); }
  }

  /**
  * @description Returns the sql query whitin sentences JSON.
  * @param {string} idSentence - query id.
  * @returns {string} sql sentence whitin sentences JSON or a empty string if the sentences doesn't exists.
  */
  getSentence(idSentence) {
    return this.sentences[idSentence] || "";
  }

  /**
  * @async
  * @description Returns a pool client to execute sql queries.
  * @return {Promise<pg.Client>}  A promise that contains the clientwhen fulfilled.
  */
  async getClient() {
    return await this.pool.connect();
  }
}
module.exports = DbComponent;
