FROM node:22-alpine

WORKDIR /app

# Copy patches directory first (before package.json)
COPY patches ./patches

# Copy package.json and pnpm-lock.yaml
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install npm and remove pnpm if it exists
RUN npm install -g npm@latest && \
    npm install -g pnpm && \
    npm cache clean --force

# Install dependencies with npm (ignore pnpm-lock.yaml)
RUN npm install --no-optional --no-audit --no-fund --legacy-peer-deps

# Copy the rest of the code
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["node", "dist/server/_core/index.js"]
