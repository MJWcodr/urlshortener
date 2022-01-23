"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Logger_1 = __importDefault(require("../logger/Logger"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const stringToHash_1 = __importDefault(require("../utils/stringToHash"));
const _datadir = "./data/";
const db_name = _datadir + "url.db";
const logger = Logger_1.default.getInstance();
class Database {
    constructor() {
        this.createFile();
        this.db = new sqlite3_1.default.Database(db_name, (err) => {
            if (err) {
                logger.error(String(err));
                throw err;
            }
        });
        this.checkDBexists();
    }
    /**
     * createFile
     */
    createFile() {
        try {
            if (!fs_1.default.existsSync(_datadir)) {
                fs_1.default.mkdirSync(_datadir);
                logger.info("Created File for Database");
            }
        }
        catch (error) {
            logger.error(`unable to create directory: ${_datadir}`);
        }
    }
    /**
     *
     * @returns an Instance of Database (Database is a Singleton)
     */
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    /**
     * checkDBexists
     *
     */
    checkDBexists() {
        const createCommand = [`CREATE TABLE IF NOT EXISTS URL_table (
            URL_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            LongURL VARCHAR NOT NULL,
            ShortURL VARCHAR NOT NULL UNIQUE);`];
        createCommand.forEach(element => {
            this.db.exec(element, (err) => {
                if (err) {
                    logger.error(String(err));
                }
            });
        });
        logger.success("Successfully started db");
    }
    /**
     *
     * @param attribute must be "ShortURL" (Attribute to query by)
     * @param value Value to be looked uo
     * @returns 'row' if succesfull
     * @returns 'null' if not found in db
     * @returns "/" if value is activeSubdomain
     */
    getValue(attribute, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT LongURL, ShortURL FROM URL_table WHERE ${attribute} = ?`;
            return new Promise((resolve, reject) => {
                this.db.get(sql, value, (err, row) => {
                    if (err) {
                        logger.error(String(err));
                        reject(err);
                    }
                    if (row) {
                        resolve(row);
                    }
                    else {
                        resolve(null);
                    }
                });
            });
        });
    }
    postValue(urlQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO URL_table (LongURL, ShortURL) VALUES (?,?)`;
            if (!urlQuery.ShortURL) {
                urlQuery.ShortURL = (0, stringToHash_1.default)(urlQuery.LongURL + Math.random());
            }
            let URL = [urlQuery.LongURL, urlQuery.ShortURL];
            return new Promise((resolve, reject) => {
                this.db.run(sql, URL, (err) => {
                    if (err) {
                        if (err.message) {
                            reject(err.message);
                        }
                        reject(err.message);
                    }
                    if (urlQuery.ShortURL) {
                        resolve({
                            LongURL: urlQuery.LongURL,
                            ShortURL: urlQuery.ShortURL
                        });
                    }
                });
            });
        });
    }
}
exports.default = Database;
