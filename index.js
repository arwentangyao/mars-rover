#!/usr/bin/node
'use strict';
var inputParser = require('./input-parser');
var mr = require('./mars-rover');
var fs = require('fs');
var filePath = process.argv[2];
var fileContent = fs.readFileSync(filePath, 'utf-8');
var gameMove = inputParser(fileContent);
var finalSpot = mr.createWorld(gameMove.topRightBoundary)
    .robot(gameMove.startingPosition)
    .move(gameMove.instructions);
console.log(buildOutput(finalSpot));
function buildOutput(finalSpot) {
    var output = finalSpot.cooridnate.x.toString() +
        ' ' +
        finalSpot.cooridnate.y.toString() +
        ' ' +
        finalSpot.cooridnate.orientation.command;
    return finalSpot.lost ? output += ' LOST' : output;
}
