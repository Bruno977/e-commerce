FROM node:20-slim

RUN apt-get update && apt-get install -y

USER node

WORKDIR /home/node/app

CMD ["/home/node/app/.docker/start-dev.sh"]