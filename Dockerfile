# => Build container
FROM node:10 as builder
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

# => Run container
FROM nginx:1.15.2-alpine

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Static build
COPY --from=builder /app/build /usr/share/nginx/html/

# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env-prod.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env-prod.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env-prod.sh && nginx -g \"daemon off;\""]


# docker image build . -t arturocv/docanalyzer-frontend
# docker push arturocv/docanalyzer-frontend
# docker run -d -p 6413:80 arturocv/docanalyzer-frontend