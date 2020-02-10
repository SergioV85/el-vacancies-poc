#!/bin/bash

#start app
sudo pm2 start /var/www/el-jobs-poc-sever/main.js -i 0 --name "el-jobs-poc-sever"
