#!/bin/bash
 
myscript(){
   cd src && nodemon --exec babel-node ./src/server.js
}
 
until myscript; do
        echo Script myapp.js has been crashed with exit code $?. Restart echo now!
        sleep 1
done