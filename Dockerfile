# Use the official Node.js LTS image as base
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Clone your GitHub repository into the working directory
RUN apk add --no-cache git \
    && git clone https://github.com/WesleyVeeningen/vrije-opdracht.git .

# Install dependencies
RUN npm install

# Build the Next.js application for production
RUN npm run build

# Download and install PocketBase (assuming it's part of your project)
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.13/pocketbase_0.22.13_linux_amd64.zip \
    && unzip -o pocketbase_0.22.13_linux_amd64.zip \
    && rm pocketbase_0.22.13_linux_amd64.zip

# Make pocketbase executable
RUN chmod +x ./pocketbase

# Expose the port that Next.js runs on (usually 3000)
EXPOSE 3000

# Start the Next.js application and run pocketbase serve
CMD ["sh", "-c", "./pocketbase serve && npm start"]
