"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = require("express");
const Database_1 = __importDefault(require("../db/Database"));
const Logger_1 = __importDefault(require("../logger/Logger"));
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)();
const activeSubdomains = ['', 'shorturls'];
const router = (0, express_1.Router)();
exports.default = router;
const db = Database_1.default.getInstance();
const logger = Logger_1.default.getInstance();
router.route('/created')
    .post((req, res) => {
    if (req.body.LongURL) {
        let newURL = {
            LongURL: req.body.LongURL,
            ShortURL: req.body.ShortURL
        };
        db.postValue(newURL).then(data => res.send({
            "LongURL": data.LongURL,
            "ShortURL": data.ShortURL
        }))
            .catch(err => {
            logger.error(String(err));
            if (err) {
                res.send(`${newURL.ShortURL}: ShortURL already in Database`).status(500);
            }
            else {
                res.send("Internal Server Error").status(500);
            }
        });
    }
    else {
        res.send("Misformatted Request").status(500);
    }
});
router.route('/:id')
    .get((req, res) => {
    if (activeSubdomains.includes(req.params.id)) {
        res.sendFile(path_1.default.join(process.cwd(), '/frontend/build/index.html'));
    }
    else {
        // if the url is not a static subdomain
        // query the database
        db.getValue("ShortURL", req.params.id).then(data => {
            if (data == null) {
                res.sendFile(path_1.default.join(process.cwd() + "/public/errors/notInDb.html"));
                logger.error(`${req.params.id} is not in URL_table`);
            }
            if (data) {
                // and redirect
                res.redirect(data.LongURL);
            }
        });
    }
})
    .post((_req, _res, _err, next) => {
    next();
});
