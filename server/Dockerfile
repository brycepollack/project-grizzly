FROM node:14
ADD . /express
WORKDIR /express
COPY package*.json ./
RUN npm install
COPY . .
# CMD ["npm", "start"]
CMD ["npm", "run","dev"]