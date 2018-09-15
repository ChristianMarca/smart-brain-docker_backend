FROM node:10
# FROM node:10.10.0-pure

WORKDIR /usr/src/Facial-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]