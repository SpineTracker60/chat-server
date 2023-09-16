# Base image
FROM node:18

ENV TZ=Asia/Seoul

# Bundle APP files
WORKDIR /app

COPY . .

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN npm cache clean --force

RUN npm install -g dotenv-cli

RUN npm install

EXPOSE 3000
EXPOSE 3030

# Start the server using the production build
CMD npm start