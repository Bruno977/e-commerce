FROM node:20-slim

RUN apt-get update && apt-get install -y

USER node

WORKDIR /home/next/app

CMD ["/home/next/app/.docker/start-dev.sh"]