FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

WORKDIR /home/app
COPY package*.json .
RUN npm install
COPY controllers controllers
COPY models models
COPY routes routes
COPY utils utils
COPY index.js index.js
ENTRYPOINT [ "node","index.js" ]



