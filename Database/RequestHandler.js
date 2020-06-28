require('dotenv').config()

var express = require('express')
var mysql = require('mysql')
var bodyParser = require("body-parser");
var cors = require('cors');

const port = 8080

var app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

var allowedOrigins = ['http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback){
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from ' + origin;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'focusDB'
})

app.post('/getsites', (req, res) => {
    console.log("Received getsites request");
    connection.query('SELECT site FROM websites WHERE selected', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

app.post('/deletesite', (req, res) => {
    console.log("Received deletesite request with site = " + req.body.site);
    connection.query('DELETE site FROM websites WHERE site = "'+ req.body.site + '"', function (err, rows, fields) {
        if (err) throw err
        res.send(true)
    })
})

app.post('/updatesites', (req, res) => {
    connection.query('', function (err, rows, fields) {
        if (err) throw err
        res.send(true)
    })
})

app.post('/storeusage', (req, res) => {
    
    console.log("Received storeusage request with site = " + req.body.site + ", usage = " + req.body.usage + ", date = " + req.body.date);

    connection.query('SELECT * FROM usage_data WHERE site = "' + req.body.site + '" AND date = "' + req.body.date + '"', function (err, output, fields) {
        console.log(output);
        if (output.length > 0){
            connection.query('UPDATE usage_data SET `usage` = `usage` + ' + req.body.usage + ' WHERE site = "' + req.body.site + '" AND date = "'+ req.body.date + '"', function (err, rows, fields) {
                if (err) throw err
                res.send(true);
            })
        }
        else{
            var stmt = 'INSERT INTO `usage_data`(`site`, `date`, `usage`) VALUES ("' + req.body.site + '", "' + req.body.date + '", ' + req.body.usage + ')';
            
            console.log(stmt);
            connection.query(stmt, function (err, rows, fields) {
                if (err) throw err
                res.send(true);
            })
        }
    })
})

app.listen(port)