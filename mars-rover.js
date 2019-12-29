'use strict';
var i = require('./instructions');
function createRobot(topRightboundary, startingPosition) {
    return {
        move: move.bind(null, topRightboundary, startingPosition)
    };
}
var lostConditions = [
    function lostEast(topRightboundary, finalCoordinate) {
        return finalCoordinate.x > topRightboundary.x;
    },
    function lostNorth(topRightboundary, finalCoordinate) {
        return finalCoordinate.y > topRightboundary.y;
    },
    function lostSouth(topRightboundary, finalCoordinate) {
        return finalCoordinate.y < 0;
    },
    function lostWest(topRightboundary, finalCoordinate) {
        return finalCoordinate.x < 0;
    }
];
function move(topRightboundary, startingPosition, instructions) {
    var finalSpot = instructions.reduce(function (finalSpot, instruction) {
        var position = finalSpot.cooridnate;
        if (finalSpot.lost) {
            return finalSpot;
        }
        if (instruction === i.Instructions.Move) {
            position = position.orientation.move(position);
        }
        if (instruction === i.Instructions.Right) {
            position = position.orientation.right(position);
        }
        if (instruction === i.Instructions.Left) {
            position = position.orientation.left(position);
        }
        finalSpot.lost = lostConditions.some(function (isLost) { return isLost(topRightboundary, finalSpot.cooridnate); });
        finalSpot.cooridnate.x = Math.max(0, Math.min(finalSpot.cooridnate.x, topRightboundary.x));
        finalSpot.cooridnate.y = Math.max(0, Math.min(finalSpot.cooridnate.y, topRightboundary.y));
        return finalSpot;
    }, { cooridnate: startingPosition, lost: false });
    return finalSpot;
}
function createWorld(topRightboundary) {
    return {
        robot: createRobot.bind(null, topRightboundary)
    };
}
exports.createWorld = createWorld;
