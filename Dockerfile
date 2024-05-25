FROM node:18.15.0
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install -g @angular/cli@17.2.0 && \
   npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]