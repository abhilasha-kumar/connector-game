# connector-games

This sub-folder consists the code for the original version of Connector.

## Requirements

* NPM and Node JS
* Install nodegame: https://github.com/nodeGame/nodegame

## Build

Using npm build script will copy to the ./dist directory
* npm run build

## Deploy

* Copy the game directory after the build from the ./dist to the /games directory of the nodegame install

## Developer Notes

* game/client_types/player.js - the bulk of the game logic is here
* game/game.settings.js - game configuration; could use treatments to change these at runtime