FROM node:10 as builder

ENV WORK_DIR /usr/src/app

RUN mkdir ${WORK_DIR}
WORKDIR ${WORK_DIR}

COPY package-server.json ${WORK_DIR}/package.json

RUN [ "npm", "install" ]

COPY . ${WORK_DIR}

RUN [ "npm", "run", "build", "--" , "--project=api", "--prod" ]

FROM node:10

ENV WORK_DIR /usr/src/app
WORKDIR ${WORK_DIR}

# COPY --from=builder ${WORK_DIR}/package-server.json ${WORK_DIR}

RUN [ "npm", "install", "typescript", "-", "g"]
RUN [ "npm", "install", "ts-node", "-", "g"]

# RUN [ "npm", "install", "--", "production"]

COPY --from=builder ${WORK_DIR}/dist/apps/api ${WORK_DIR}

EXPOSE 3333
CMD [ "node", "main.js" ]
