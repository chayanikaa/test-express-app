# Use an official Node runtime as base image
FROM --platform=linux/x86_64 node:21

# Set working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# RUN chown -R 1001:1001 /tmp/npm

# Bundle app source
COPY . .

# Expose port
EXPOSE 3000

# Run app
CMD ["node", "app.js"]
