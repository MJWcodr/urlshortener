#!/bin/bash
cd /srv/www/urlshortener-backend
npm i
cd frontend
npm i
npm run build
cd -
npm start
