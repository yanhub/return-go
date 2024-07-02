ARG DOCKER_NODE_VERSION=20.15
FROM node:${DOCKER_NODE_VERSION}

ARG DOCKER_UID=1000
ARG DOCKER_GID=1000

ENV YARN_VERSION 1.22.22

WORKDIR /app

#RUN groupmod -g $DOCKER_GID node && usermod -u $DOCKER_UID -g $DOCKER_GID node
RUN addgroup -g $DOCKER_GID node || true
RUN adduser -u $DOCKER_UID -G node -s /bin/sh -D node || true

RUN echo "ignore-engines true" >> /home/node/.yarnrc
RUN chown node:node /home/node/.yarnrc

RUN npm install -g @nestjs/cli node-ts
