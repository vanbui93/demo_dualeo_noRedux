// start connect API
const {  Pool, Client } = require('pg')
const connectionString = 'postgres://sezfxvfd:fcfgYpLxTvIpKnsliDYq_NLqswImFHOl@john.db.elephantsql.com:5432/sezfxvfd'
const pool = new Pool({ connectionString, max: 25, idleTimeoutMillis: 1000})
// end connect API

module.exports = pool