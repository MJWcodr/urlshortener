import { config } from "dotenv"
import { Router } from "express";
import Database from "../db/Database";
import Logger from "../logger/Logger";
import path from 'path'
import { properURL, urlShort } from "../types/url"
import { uniqueConstraintError } from "../types/databaseErrors";

config()
const activeSubdomains = ['', 'shorturls']
const router: Router = Router();
export default router;

const db = Database.getInstance()
const logger = Logger.getInstance()



router.route('/created')
    .post((req, res) => {
        if (req.body.LongURL as properURL){
            let newURL: urlShort = {
                LongURL: req.body.LongURL,
                ShortURL: req.body.ShortURL
            }
            db.postValue(newURL).then(
                data => res.send({
                    "LongURL": data.LongURL,
                    "ShortURL": data.ShortURL
                })
            )
            .catch(err => {
                logger.error(String(err))
                if (err as uniqueConstraintError){
                    res.send(`${newURL.ShortURL}: ShortURL already in Database`).status(500)
                } else {
                    res.send("Internal Server Error").status(500)
                }
            })
        }
        else {
            res.send("Misformatted Request").status(500)
        }

        
    })

router.route('/:id')
    .get((req, res) => {
        if (activeSubdomains.includes(req.params.id)) {
            res.sendFile(path.join(process.cwd(), '/frontend/build/index.html'));
        } else {
            // if the url is not a static subdomain
            // query the database
            db.getValue("ShortURL", req.params.id).then(data => {
                if (data == null) {
                    res.sendFile(path.join(process.cwd() + "/public/errors/notInDb.html"))
                    logger.error(`${req.params.id} is not in URL_table`)
                }
                if (data) {
                    // and redirect
                    res.redirect(data.LongURL)
                } 
            })
        }
    })
    .post((_req: any, _res: any, _err: any, next: any) => {
        next()
    })