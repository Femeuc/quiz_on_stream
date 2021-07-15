const { Pool } = require('pg');
const parse = require('pg-connection-string').parse;
var pool = null;

const ENV = "dev"; // prod -> production;  dev -> developtment

if(ENV == "prod") { 
    // Remote Database
    //var PG_CONNECT_STRING = parse("");
    //pool = new Pool(PG_CONNECT_STRING);
} else if(ENV == "dev"){ 
    // Local Database
    pool = new Pool({
        host: 'localhost',
        user: 'postgres',
        password: 'postgres',
        database: 'quiz_on_stream',
        port: '5432'
    });
} 

module.exports = pool;