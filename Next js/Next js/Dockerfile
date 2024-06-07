# Use the official Node.js image as a parent image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock if using Yarn)
COPY package*.json ./

# Install dependencies
# If using yarn, use `yarn install` instead
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 for the Next.js app to be accessible externally
EXPOSE 3000

# Define the command to run your app using CMD
CMD ["npm","run", "start" ]
