FROM node:18-slim

COPY . .

RUN npm install

EXPOSE 8080

CMD ["node", "server.mjs"]
