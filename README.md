#Palo IT Mobile App

## check runtime
node -v
npm -v

## install clis
npm install -g grunt-cli bower yo

## resolve dependencies
npm install
bower install

## build app
### run RequireJS Optimization
node_modules\.bin\r.js -o app.build.js
node_modules\.bin\r.js.cmd -o app.build.js

## Grunt
grunt -h

grunt production

