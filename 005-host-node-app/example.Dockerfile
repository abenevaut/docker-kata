FROM node:20-slim

WORKDIR /home/node/app

# Copy app.js, package.json and package-lock.json to the container

# Execute npm install to install the dependencies

# expose the port 3000

CMD ["node", "/home/node/app/app.js"]
