FROM node:18

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 8080

CMD [ "yarn", "run", "preview" ]