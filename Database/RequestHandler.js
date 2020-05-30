require('dotenv').config()

var express = require('express')
var mysql = require('mysql')

var app = express()
const port = 8080

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'focusDB'
})

app.post('/getsites', (req, res) => {
    connection.query('SELECT site FROM websites WHERE selected', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

app.post('/updatesites', (req, res) => {
    connection.query('', function (err, rows, fields) {
        if (err) throw err
        res.send(true)
    })
})

app.post('/storeusage', (req, res) => {
    connection.query('SELECT * FROM usage_data WHERE date =  ' + req.data.date, function (err, output, fields) {
        if (output.length > 0){
            connection.query('UPDATE usage_data SET usage = usage + ' + req.data.time + ' WHERE site = ' + req.data.site + ' AND date = '+ req.data.date, function (err, rows, fields) {
                res.send(true)
            })
        }
        else{
            connection.query('INSERT INTO usage_data (site, date, usage) VALUES (' + req.data.site + ", " + req.data.date + ", " + req.data.time + ")", function (err, rows, fields) {
                res.send(true)
            })
        }
    })
})

app.listen(port)