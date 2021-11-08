// Variables
const _datadir = './data/'
const port = process.argv.splice(2)[0] || 3000
const activeSubdomains = ['link', 'shorturls', '/']
const Hostname = "https://mjw.li/" // must be in format "https://erxample.com/"

// Dependencies
const express = require('express');
const app = express();
const path = require('path'); app.use(express.static(path.join(__dirname, 'frontend/build')));
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')
const favicon = require('express-favicon')
const cors = require('cors');
const { runInNewContext } = require('vm');
const stringToHash = require('./utils/stringToHash');

app.use(cors({
    origin: 'http://ip-api.com/json'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, 'favicon.png')));


// Database
// Connect DB
try {
    if (!fs.existsSync(_datadir)) {
        fs.mkdirSync(_datadir)
    }
}
catch (err) {
    console.log(err)
}

const db_name = path.join(__dirname, "data", "url.db");
const db = new sqlite3.Database(db_name, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful connection to the database 'url.db'");
});

// Create DB if not already existent
const create = [`CREATE TABLE IF NOT EXISTS URL_table (
    URL_ID INTEGER PRIMARY KEY AUTOINCREMENT,
    LongURL VARCHAR NOT NULL,
    ShortURL VARCHAR NOT NULL UNIQUE);`]
for (i = -1; i++; i > create.length) {
    db.run(create[0], err => {
        if (err) {
            return console.error(err.message);
        }
    });
}


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
    const sql = "INSERT INTO URL_table (LongURL, ShortURL) VALUES (?,?)"
    let ShortURL = req.body.ShortURL
    let LongURL = req.body.LongURL

    if (ShortURL == undefined || ShortURL == "") {
        ShortURL = stringToHash(LongURL)
    }

    let URL = [LongURL, ShortURL]
    db.run(sql, URL, err => {
        if (err) {
            if (err.errno === 19) {
                res.send("failed to add entry").status(500)
            }
            else {
                res.sendStatus(500)
                return console.log(err)
            }
        }
        else {
            res.send(Hostname + ShortURL).status(200)
        }
    })
})


// Listen
app.listen(port, () => {
    console.log('Listening on port', port);
});