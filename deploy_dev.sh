#!/bin/bash
# node ./prepare/sitemap/index.js
# node ./prepare/robot.js
sudo sshfs -o allow_other,default_permissions,IdentityFile=/home/serj/.ssh/FeelQueen_prod.pem ubuntu@35.158.164.127:/ /mnt/prod
echo -ne '#####                     (33%)\r'
sleep 1
echo -ne '#############             (66%)\r'
sleep 1
VAR1="/build/*"
SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )${VAR1}"

cp -r $SCRIPTPATH  /mnt/prod/home/ubuntu/test_salon
#cp -r /home/serj/sites/fq_salons/build/*  /mnt/prod/home/ubuntu/test_salon
echo -ne '#######################   (100%)\r'
sudo fusermount -u  /mnt/prod
echo -ne '\n'
