FROM node:15.9.0 as build-stage
COPY ./ /bee-game
WORKDIR /bee-game
RUN yarn && yarn build

CMD ["yarn", "serve", "-s", "build", "-l", "8080"]