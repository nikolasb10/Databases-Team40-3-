const mysql = require('mysql2');

// create connection and export it
var mysqlConnection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: 'mnaa090601mysql',
  database: 'projectfunding',
  multipleStatements: true
});

mysqlConnection.connect((err)=>{
  if(!err) console.log('DB connection succeeded.');
  else console.log('DB connection failed \n Error : ' + JSON.stringify(err,undefined,2));
});

module.exports = { mysqlConnection };
