#!/bin/bash

cd /root/app/graphpaper/.demeteorized
npm install
docker kill graphpaper
docker rm graphpaper
docker run -d -v /root/app/graphpaper/.demeteorized:/usr/src/app -e ROOT_URL=http://128.199.141.170:3000/ -e MONGO_URL=mongodb://graphpaper:n[MHDtAcQmDl@kahana.mongohq.com:10075/graphpaper -e PORT=3000 -p 3000:3000 --name="graphpaper" andrewbeng89/demeteorize