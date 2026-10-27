FROM node:20-alpine

WORKDIR /app

COPY apps/api/package*.json ./apps/api/

RUN cd apps/api && npm install

COPY apps/api ./apps/api
COPY packages ./packages

EXPOSE 4000

WORKDIR /app/apps/api

CMD ["npm", "run", "dev"]
