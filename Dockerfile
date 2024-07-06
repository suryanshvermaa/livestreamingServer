FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y nodejs ffmpeg
RUN apt-get install nginx
RUN add-apt-repository universe
RUN apt-get install libnginx-mod-rtmp


COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /home/app
COPY package*.json .
RUN npm install
COPY . .

ENTRYPOINT [ "node","index.js" ]



