# Predicting Word Choice using Distributional Information in a Cooperative Language Game

Abhilasha A. Kumar, Mark Steyvers, David A. Balota

Abstract

Simple language games are considered
central to understanding contextual
language use, although the role of
distributional information in predicting
word choice and cooperative interactions in
language games remains relatively
understudied. We introduce a novel twoplayer language game, Connector, based
on the Codenames boardgame, and
evaluate the performance of three
embedding models in the game. Our results
indicate that embedding models effectively
capture search processes and also predict
shifts in word choice based on
distributional information, although there
are limits to the explicit predictive power of
pure embedding models. These results
highlight the different sources of
information (distributional, perceptual,
categorical, etc.) that speakers and listeners
recruit to generate novel word associations
in a cooperative setting and indicate that
distributional models trained on purely
linguistic corpora may be limited in the
extent to which they can model this
behavior.

## Connector

### Requirements

* NPM and Node JS
* Install nodegame: https://github.com/nodeGame/nodegame

### Build

Using npm build script will copy to the ./dist directory
* If this is the first time you pulled the code down, run: npm install (this will pull down any dependencies from package.json)
* npm run build

### Deploy

* Copy the game directory after the build from the ./dist to the /games directory of the nodegame install

### Developer Notes

* game/client_types/player.js - the bulk of the game logic is here
* game/game.settings.js - game configuration; could use treatments to change these at runtime