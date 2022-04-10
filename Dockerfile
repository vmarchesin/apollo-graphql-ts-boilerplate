FROM node:16 as devbase
WORKDIR /
COPY . /

RUN npm i
RUN npx prisma generate

EXPOSE $PORT

FROM devbase as production

ENV NODE_PATH=./build

RUN npm run build
