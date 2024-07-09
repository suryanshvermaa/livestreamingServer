FROM tiangolo/nginx-rtmp

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y ffmpeg
COPY nginx.conf /etc/nginx/nginx.conf



