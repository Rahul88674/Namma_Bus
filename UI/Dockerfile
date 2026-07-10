FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN echo "API=$VITE_API_BASE_URL" && npm run build

RUN npm install -g serve

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]