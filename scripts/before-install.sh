#!/bin/bash

# Install node
curl -sL https://rpm.nodesource.com/setup_12.x | bash -
yum install -y nodejs
npm i -g pm2

# prepare artifacts
cd /var/www/el-jobs-poc-sever/
unzip * -d /var/www/el-jobs-poc-sever/ -u
