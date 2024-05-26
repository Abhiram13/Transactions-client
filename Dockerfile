ARG node=node:18.19.0-alpine3.18

# Define node version
FROM $node as build

# Define container directory
WORKDIR /app

# Copy package*.json for npm install
COPY package*.json .

# Run npm install @angular/cli
RUN npm install -g @angular/cli@17.2.0

# Run npm clean install, including dev dependencies for @angular-devkit
RUN npm install

# Copy all files
COPY . .

RUN npm run build:production

FROM $node

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/server.js ./server.js

CMD ["npm", "start"]