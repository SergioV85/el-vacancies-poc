#! /bin/bash
cd /var/www/el-jobs-poc-sever/
unzip * -d /var/www/el-jobs-poc-sever/ -u
npm i
node main.js
