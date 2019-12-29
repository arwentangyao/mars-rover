'use strict';

exports.orientations = [
    {
        move: function (position) {
            position.y++;
            return position;
        },
        right: function (position) {
            position.orientation = exports.Orientations.East;
            return position;
        },
        left: function (position) {
            position.orientation = exports.Orientations.West;
            return position;
        },
        command: 'N'
    },
    {
        move: function (position) {
            position.y--;
            return position;
        },
        right: function (position) {
            position.orientation = exports.Orientations.West;
            return position;
        },
        left: function (position) {
            position.orientation = exports.Orientations.East;
            return position;
        },
        command: 'S'
    },
    {
        move: function (position) {
            position.x++;
            return position;
        },
        right: function (position) {
            position.orientation = exports.Orientations.South;
            return position;
        },
        left: function (position) {
            position.orientation = exports.Orientations.North;
            return position;
        },
        command: 'E'
    },
    {
        move: function (position) {
            position.x--;
            return position;
        },
        left: function (position) {
            position.orientation = exports.Orientations.South;
            return position;
        },
        right: function (position) {
            position.orientation = exports.Orientations.North;
            return position;
        },
        command: 'W'
    }
];
exports.Orientations = {
    North: exports.orientations[0],
    South: exports.orientations[1],
    East: exports.orientations[2],
    West: exports.orientations[3]
};
