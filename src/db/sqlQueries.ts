export const sqlQueries = {
    create: [
        `CREATE TABLE IF NOT EXISTS URL_table (
            URL_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            LongURL VARCHAR NOT NULL,
            ShortURL VARCHAR NOT NULL UNIQUE);`,
        `CREATE TABLE IF NOT EXISTS Access_table (
            ID       INTEGER  PRIMARY KEY AUTOINCREMENT
                                UNIQUE
                                NOT NULL,
            ShortURL          NOT NULL
                                REFERENCES URL_table (ShortURL),
            IP       STRING,
            Date     DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime') ) 
                                NOT NULL,
            XHR      BOOLEAN,
            Browser  STRING,
            Origin   STRING,
            Source   STRING,
            Version  STRING
        );`
    ],
    logPointAdd: `INSERT INTO Access_table (
        ShortURL,
        IP,
        XHR,
        Browser,
        Origin,
        Source,
        Version
        )
        VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        );`,
    getNumberOfAcceses: `
    SELECT COUNT(ShortURL) AS NumberOfAccesses
    FROM Access_table 
    WHERE ShortURL = (?)
    `
}