'use strict';
var test = require('tape');
var i = require('../src/instructions');
var mr = require('../src/mars-rover');
var p = require('../src/positions');
var upperRightBoundery = { x: 1, y: 1 };
var testCases = [
    {
        name: 'A robot with no instructions remains at the start position',
        startingPosition: { x: 0, y: 0, orientation: p.Orientations.North },
        instructions: [],
        expected: {
            cooridnate: {
                x: 0,
                y: 0,
                orientation: p.Orientations.North
            },
            lost: false
        }
    },
    {
        name: 'Forward instruction moves robot forward north',
        startingPosition: { x: 0, y: 0, orientation: p.Orientations.North },
        instructions: [i.Instructions.Move],
        expected: {
            cooridnate: {
                x: 0,
                y: 1,
                orientation: p.Orientations.North
            },
            lost: false
        }
    },
    {
        name: 'Forward instruction moves robot forward south',
        startingPosition: { x: 0, y: 1, orientation: p.Orientations.South },
        instructions: [i.Instructions.Move],
        expected: {
            cooridnate: {
                x: 0,
                y: 0,
                orientation: p.Orientations.South
            },
            lost: false
        }
    },
    {
        name: 'Forward instruction moves robot forward east',
        startingPosition: { x: 0, y: 0, orientation: p.Orientations.East },
        instructions: [i.Instructions.Move],
        expected: {
            cooridnate: {
                x: 1,
                y: 0,
                orientation: p.Orientations.East
            },
            lost: false
        }
    },
    {
        name: 'Moving off the grid east marks the robot as lost',
        startingPosition: { x: 0, y: 0, orientation: p.Orientations.East },
        instructions: [i.Instructions.Move, i.Instructions.Move],
        expected: {
            cooridnate: {
                x: 1,
                y: 0,
                orientation: p.Orientations.East
            },
            lost: true
        }
    },
    {
        name: 'Moving off the grid north marks the robot as lost',
        startingPosition: { x: 0, y: 0, orientation: p.Orientations.North },
        instructions: [i.Instructions.Move, i.Instructions.Move],
        expected: {
            cooridnate: {
                x: 0,
                y: 1,
                orientation: p.Orientations.North
            },
            lost: true
        }
    },
    {
        name: 'Moving off the grid south marks the robot as lost',
        startingPosition: { x: 0, y: 0, orientation: p.Orientations.South },
        instructions: [i.Instructions.Move, i.Instructions.Move],
        expected: {
            cooridnate: {
                x: 0,
                y: 0,
                orientation: p.Orientations.South
            },
            lost: true
        }
    },
    {
        name: 'Moving off the grid west marks the robot as lost',
        startingPosition: { x: 0, y: 0, orientation: p.Orientations.West },
        instructions: [i.Instructions.Move, i.Instructions.Move],
        expected: {
            cooridnate: {
                x: 0,
                y: 0,
                orientation: p.Orientations.West
            },
            lost: true
        }
    },
    {
        name: 'Turing right when facing north faces you east',
        startingPosition: { x: 0, y: 0, orientation: p.Orientations.North },
        instructions: [i.Instructions.Right],
        expected: {
            cooridnate: {
                x: 0,
                y: 0,
                orientation: p.Orientations.East
            },
            lost: false
        }
    },
    {
        name: 'Turing right when facing east faces you south',
        startingPosition: { x: 0, y: 0, orientation: p.Orientations.East },
        instructions: [i.Instructions.Right],
        expected: {
            cooridnate: {
                x: 0,
                y: 0,
                orientation: p.Orientations.South
            },
            lost: false
        }
    },
    {
        name: 'Turing right when facing south faces you west',
        startingPosition: { x: 0, y: 0, orientation: p.Orientations.South },
        instructions: [i.Instructions.Right],
        expected: {
            cooridnate: {
                x: 0,
                y: 0,
                orientation: p.Orientations.West
            },
            lost: false
        }
    },
    {
        name: 'Turing right when facing west faces you north',
        startingPosition: { x: 0, y: 0, orientation: p.Orientations.West },
        instructions: [i.Instructions.Right],
        expected: {
            cooridnate: {
                x: 0,
                y: 0,
                orientation: p.Orientations.North
            },
            lost: false
        }
    },
    {
        name: 'Turing left when facing north faces you west',
        startingPosition: { x: 0, y: 0, orientation: p.Orientations.North },
        instructions: [i.Instructions.Left],
        expected: {
            cooridnate: {
                x: 0,
                y: 0,
                orientation: p.Orientations.West
            },
            lost: false
        }
    },
    {
        name: 'Turing left when facing east faces you south',
        startingPosition: { x: 0, y: 0, orientation: p.Orientations.East },
        instructions: [i.Instructions.Left],
        expected: {
            cooridnate: {
                x: 0,
                y: 0,
                orientation: p.Orientations.North
            },
            lost: false
        }
    },
    {
        name: 'Turing left when facing south faces you east',
        startingPosition: { x: 0, y: 0, orientation: p.Orientations.South },
        instructions: [i.Instructions.Left],
        expected: {
            cooridnate: {
                x: 0,
                y: 0,
                orientation: p.Orientations.East
            },
            lost: false
        }
    },
    {
        name: 'Turing left when facing west faces you south',
        startingPosition: { x: 0, y: 0, orientation: p.Orientations.West },
        instructions: [i.Instructions.Left],
        expected: {
            cooridnate: {
                x: 0,
                y: 0,
                orientation: p.Orientations.South
            },
            lost: false
        }
    },
    {
        name: 'Moving forward after getting lost doesn\'t advance any further',
        startingPosition: { x: 0, y: 0, orientation: p.Orientations.North },
        instructions: [
            i.Instructions.Move,
            i.Instructions.Move,
            i.Instructions.Move
        ],
        expected: {
            cooridnate: {
                x: 0,
                y: 1,
                orientation: p.Orientations.North
            },
            lost: true
        }
    },
    {
        name: 'Turning around after getting lost doesn\'t affect final position',
        startingPosition: { x: 0, y: 0, orientation: p.Orientations.North },
        instructions: [
            i.Instructions.Move,
            i.Instructions.Move,
            i.Instructions.Left
        ],
        expected: {
            cooridnate: {
                x: 0,
                y: 1,
                orientation: p.Orientations.North
            },
            lost: true
        }
    }
];
testCases.forEach(function (testCase) {
    test(testCase.name, function (assert) {
        var finalPosition = mr
            .createWorld(upperRightBoundery)
            .robot(testCase.startingPosition)
            .move(testCase.instructions);
        checkPosition(assert, testCase.expected, finalPosition);
        assert.end();
    });
});
function checkPosition(assert, expected, actual) {
    assert.equal(expected.cooridnate.y, actual.cooridnate.y);
    assert.equal(expected.cooridnate.x, actual.cooridnate.x);
    assert.equal(expected.cooridnate.orientation.command, actual.cooridnate.orientation.command);
    assert.equal(expected.lost, actual.lost);
}
