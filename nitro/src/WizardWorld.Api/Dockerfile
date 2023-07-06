FROM node:20
EXPOSE 80
WORKDIR /app
ENV PORT=80

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "start"]