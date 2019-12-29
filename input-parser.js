'use strict';
var p = require('./positions');
var os = require('os');
var lineBreak = os.EOL;
var i = require('./instructions');
function parseTopRightBoundary(properties) {
    return parseCordinate(properties);
}
function parseCordinate(properties) {
    return { x: Number(properties[0]), y: Number(properties[1]) };
}
function parseStartingPosition(properties) {
    var startingPosition = parseCordinate(properties);
    startingPosition.orientation = p.orientations.filter(function (o) {
      return o.command === properties[2];
    })[0];
    return startingPosition;
}
function parseInstructions(commands) {
    return commands
        .map(function (cmd) {
        return i.instructions.filter(function (i) {
          return i.command === cmd;
        })[0];
    });
}
module.exports = function (script) {
    var parts = script.split(lineBreak);
    var topRightBoundary = parseTopRightBoundary(parts[0].split(' '));
    var startingPosition = parseStartingPosition(parts[1].split(' '));
    var instructions = parseInstructions(parts[2].split(''));
    return {
        startingPosition: startingPosition,
        topRightBoundary: topRightBoundary,
        instructions: instructions
    };
};
