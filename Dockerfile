FROM node:10

# Add Tini
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

# Add hlf-cli
ENV NODE_ENV=production
USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
RUN npm install

COPY --chown=node:node . .

VOLUME /pwd
WORKDIR /pwd
ENTRYPOINT ["/tini", "--", "/home/node/app/bin/hlf" ]
