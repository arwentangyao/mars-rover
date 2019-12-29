'use strict';
exports.instructions = [
    { command: 'M' },
    { command: 'L' },
    { command: 'R' }
];
exports.Instructions = {
    Move: exports.instructions[0],
    Left: exports.instructions[1],
    Right: exports.instructions[2]
};
