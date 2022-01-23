import fs from "fs"
import Logger from "../logger/Logger"
import sqlite3 from "sqlite3"
import stringToHash from "../utils/stringToHash"
import { urlShort } from "../types/url"

import { uniqueConstraintError } from "../types/databaseErrors"

const _datadir: string = "./data/"
const db_name = _datadir + "url.db"
const logger = Logger.getInstance()

export default class Database {
    private static instance: Database;
    db: sqlite3.Database;

    private constructor() {
        this.createFile();
        this.db = new sqlite3.Database(db_name, (err) => {
            if (err) {
                logger.error(String(err))
                throw err
            }
        })
        this.checkDBexists();
    }
    /**
     * createFile
     */
    private createFile(): void {
        try {
            if (!fs.existsSync(_datadir)) {
                fs.mkdirSync(_datadir)
                logger.info("Created File for Database")
            }

        } catch (error) {
            logger.error(`unable to create directory: ${_datadir}`)
        }
    }
    /**
     * 
     * @returns an Instance of Database (Database is a Singleton)
     */
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
    /**
     * checkDBexists
     * 
     */
    private checkDBexists(): void {
        const createCommand = [`CREATE TABLE IF NOT EXISTS URL_table (
            URL_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            LongURL VARCHAR NOT NULL,
            ShortURL VARCHAR NOT NULL UNIQUE);`]

        createCommand.forEach(element => {
            this.db.exec(element, (err) => {
                if (err) {
                    logger.error(String(err))
                }
            })
        });
        logger.success("Successfully started db")

    }
    /**
     * 
     * @param attribute must be "ShortURL" (Attribute to query by)
     * @param value Value to be looked uo
     * @returns 'row' if succesfull
     * @returns 'null' if not found in db
     * @returns "/" if value is activeSubdomain
     */
    async getValue(attribute: "ShortURL", value: String): Promise<urlShort | null> {
        const sql = `SELECT LongURL, ShortURL FROM URL_table WHERE ${attribute} = ?`
        return new Promise((resolve, reject) => {
            this.db.get(sql, value, (err: any, row: any) => {
                if (err) {
                    logger.error(String(err))
                    reject(err)
                }
                if (row) {
                    resolve(row)
                } else {
                    resolve(null)
                }
            })
        })
    }
    async postValue(urlQuery: urlShort): Promise<urlShort> {
        const sql = `INSERT INTO URL_table (LongURL, ShortURL) VALUES (?,?)`

        if (!urlQuery.ShortURL) {
            urlQuery.ShortURL = stringToHash(urlQuery.LongURL + Math.random())
        }
        let URL = [urlQuery.LongURL, urlQuery.ShortURL]
        return new Promise<urlShort>((resolve, reject) => {
            this.db.run(sql, URL, (err) => {
                if (err) {
                    if (err.message as uniqueConstraintError) {
                        reject(err.message)
                    }
                    reject(err.message)
                }
                if (urlQuery.ShortURL) {
                    resolve({
                        LongURL: urlQuery.LongURL,
                        ShortURL: urlQuery.ShortURL
                    })
                }
            })

        })
    }

}
