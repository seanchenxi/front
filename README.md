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

https://github.com/vojtajina/grunt-bump

## info
grunt-contrib-compress for the zipping
grunt-string-replace for replacing strings and placeholders in various files
grunt-phonegap-build for interacting with the Phone Gap Build API
grunt-exec for executing command line commands (For BlackBerry)

