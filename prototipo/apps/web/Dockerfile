FROM node:20-alpine

WORKDIR /app

COPY apps/web/package*.json ./apps/web/

RUN cd apps/web && npm install

COPY apps/web ./apps/web

EXPOSE 3000

WORKDIR /app/apps/web

CMD ["npm", "run", "dev"]
