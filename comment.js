// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

// Create web server
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = 3000;

// Create database
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root1234',
  database: 'nodejs'
});

// Connect to database
connection.connect();

// Create table
var sql = 'CREATE TABLE IF NOT EXISTS comments (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, author VARCHAR(255) NOT NULL, comment TEXT NOT NULL)';
connection.query(sql, function(err, results, fields) {
  if (err) {
    console.log(err);
  } else {
    console.log('Table created successfully.');
  }
});

// Create web server
server.listen(port, function() {
    console.log('Server running at http://localhost:' + port);
}
