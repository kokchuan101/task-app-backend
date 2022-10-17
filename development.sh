#!/usr/bin/env bash
set -e

mode=$1

if [ "$#" -ne 1 ]; then
    echo "Invalid number of arguments. Example: ./restore_mongo.sh {mode=normal/docker}"
    exit 1
fi

if [[ $mode != 'normal' && $mode != 'docker' ]]; then
    echo "Invalid mode, only normal or docker is allowed."
    exit 1
fi

cp .env.example .env

sudo rm -rf node_modules dist

sed -i 's/{DB_NAME}/task_app/' .env
sed -i 's/{DB_PORT}/3306/' .env
sed -i 's/{DB_USERNAME}/root/' .env
sed -i 's/{DB_PASSWORD}/root/' .env

if [[ $mode = 'normal' ]]; then
    sed -i 's/{DB_HOST}/127.0.0.1/' .env
elif [[ $mode = 'docker' ]]; then
    sed -i 's/{DB_HOST}/task-app-mysql/' .env
fi