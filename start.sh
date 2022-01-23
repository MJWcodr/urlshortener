#!/bin/bash
git pull

cd /srv/www/urlshortener-backend
npm i
npm run build
cd frontend
npm i
npm run build
cd -
npm start
