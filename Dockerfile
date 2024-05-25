# FROM node:18.15.0
# WORKDIR /usr/src/app
# COPY . /usr/src/app
# RUN npm install -g @angular/cli@17.2.0 && \
#    npm install

# CMD ["node", "index.js"]

# Define node version
FROM node:18.15.0 as build

# Define container directory
WORKDIR /app

COPY . /app

# Copy package*.json for npm install
COPY package*.json ./

# Run npm install @angular/cli
RUN npm install -g @angular/cli@17.2.0

# Run npm clean install, including dev dependencies for @angular-devkit
RUN npm install

# Copy all files
COPY . /app

# Run ng build through npm to create dist folder
RUN npm run build --prod

CMD ["npm", "start"]

# Define nginx for front-end server
# FROM nginx:1.15.8-alpine

# # Copy dist from ng build to nginx html folder
# COPY --from=build /app/dist/Transactions-client/browser /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/conf.d/default.conf