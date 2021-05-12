FROM node:lts-alpine

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

COPY --chown=node:node package.json ./

RUN yarn global add pm2 typescript

USER node

COPY --chown=node:node . .

RUN yarn

RUN yarn build

EXPOSE 8080

CMD ["pm2-docker", "process.json"]