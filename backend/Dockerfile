FROM node:16.13.2 AS node

# Builder stage
FROM node AS builder
WORKDIR /express_app
COPY package*.json ./
RUN npm install
COPY ./ .

# Final stage
FROM node AS final
RUN mkdir -p /express_app/dist
WORKDIR /express_app
COPY package*.json ./
RUN npm i --only=production
COPY --from=builder /express_app ./dist
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max_old_space_size=4096
ENV GENERATE_SOURCEMAP=false
EXPOSE 3000

ENTRYPOINT ["node", "./dist/index.js"]