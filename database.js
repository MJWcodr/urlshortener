// variables
const _datadir = './data/'

// dependencies 
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs')

function dbConnect() {
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
        ShortURL VARCHAR NOT NULL UNIQUE;
      `, `CREATE TABLE IF NOT EXISTS Access (
        ID         INTEGER PRIMARY KEY AUTOINCREMENT,
        IP,
        ShortURL           REFERENCES URL_table (ShortURL) 
                           NOT NULL,
        AccessTime TIME
    );`]
    for (i = 0; i > create.length; i++) {


        db.run(create[i], err => {
            if (err) {
                return console.error(err.message);
            }
            console.log(create[i])
            console.log("Successful creation of the 'URL' table");
        });
    }
}

module.exports = dbConnect;