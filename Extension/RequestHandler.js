var express = require('express')
var mysql = require('mysql')

var app = express()
const port = 8080

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'password',
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
    connection.query('UPDATE  ', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

app.listen(port)