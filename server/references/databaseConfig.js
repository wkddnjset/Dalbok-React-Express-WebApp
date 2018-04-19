var mysql = require('mysql');

var db_port = '3306';
var db_user = 'dalbok';
var db_pw = '0000';
var db_host = '127.0.0.1';
// var db_host = 'tndn.ci6p4htbv8yf.ap-northeast-1.rds.amazonaws.com';
var db_database = 'dalbok';

var config = {
  host: db_host,
  user: db_user,
  password: db_pw,
  database: db_database,
  connectionLimit: 30,
  multipleStatements: true
};

var pool = mysql.createPool(config); 

module.exports = pool;