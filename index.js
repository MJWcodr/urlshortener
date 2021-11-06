// Variables
const _datadir = './data/'
const port = 3000
const activeSubdomains = ['link', 'shorturls', '/']

// Dependencies
const dbConnect = require('./database')
const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')
const favicon = require('express-favicon')
const cors = require('cors')

// middleware
app.use(cors({
    origin: 'http://ip-api.com/json'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, 'favicon.png')));
app.use(express.static(path.join(__dirname, 'frontend/build')));

dbConnect();

// Shorturl Routing and general responses
app.get('/:id', (req, res) => {
    const id = req.params.id;
    var sql = "SELECT LongURL, ShortURL FROM URL_table WHERE ShortURL = ?"
    db.get(sql, id, (err, row) => {
        if (err) {
            throw err
        }
        if (row == null) {
            if (activeSubdomains.includes(id)) {
                res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
                return
            }
            else {
                app.use(express.static(path.join(__dirname, 'errors')));
                res.sendFile(path.join(__dirname, 'errors/404.html'));
            }
        }
        else {
            res.redirect(row.LongURL)
        }
    })
});

// Post /created
app.post('/created', (req, res, next) => {
    var sql = "INSERT INTO URL_table (LongURL, ShortURL) VALUES (?,?)"
    const URL = [req.body.LongURL, req.body.ShortURL]
    db.run(sql, URL, err => {
        res.sendStatus(200)
        console.log("new entry: " + req.body)
    })
})

// Listen
app.listen(port, () => {
    console.log('Listening on port', port);
});