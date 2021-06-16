// Global Variables
const port = 3001

// Dependencies
const express = require('express')
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors')

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// allow all cors
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "127.0.0.1");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Database
    // Connect DB
    const db_name = path.join(__dirname, "data", "url.db");
    const db = new sqlite3.Database(db_name, err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful connection to the database 'url.db'");
    });

    // Create DB if not already existent
    const sql_create = `CREATE TABLE IF NOT EXISTS URL_table (
        URL_ID INTEGER PRIMARY KEY AUTOINCREMENT,
        LongURL VARCHAR NOT NULL,
        ShortURL VARCHAR NOT NULL UNIQUE
      );`;
      
      db.run(sql_create, err => {
        if (err) {
          return console.error(err.message);
        }
        console.log("Successful creation of the 'URL' table");
      });


       // /shorturls
        // GET
        app.get('/shorturls', (req,res) => {
        res.render('shorturls')
        }) 
        // Post /created
        app.post ('/created', (req, res, next) => {
            var sql = "INSERT INTO URL_table (LongURL, ShortURL) VALUES (?,?)"
            const URL = [req.body.LongURL, req.body.ShortURL]
            db.run(sql, URL, err => {
                res.sendStatus(200)
                console.log(req.body)
            })
        })

        // Post / test
        app.post ('/pp', (req, res, next) => {
            console.log(req.body)   
            res.json({msg: 'This is CORS-enabled for an allowed domain.'})

        })
        
        // GET for any Shortlink
        app.get("/:id", (req, res) => {
            const id = req.params.id;

            var sql = "SELECT LongURL, ShortURL FROM URL_table WHERE ShortURL = ?"
            
            db.get(sql, id, (err, row) => {
                if(err){
                    throw err
                }
                if(row == null){
                    console.log("row is undefined or null")
                    res.redirect('/')
                    return
                }

                res.redirect(row.LongURL)
            })
               // placeholder
            })
        

    
        

// Listen
app.listen(port, 'localhost', () => {
    const str = 'listening on http://localhost:'+ port;
    console.log(str)
});