FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Bundle app source
COPY . .

# build frontend
RUN cd frontend 
RUN npm install && npm run build
RUN cd -

RUN npm install

# Build
RUN npm run build

EXPOSE 5555
CMD [ "npm", "start" ]