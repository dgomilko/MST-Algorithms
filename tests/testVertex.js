'use strict';

const assert = require('assert');
const Vertex = require('../graphVertex.js');

const nodeNames = [
  [ 1,    1,   'Vertex with numerical value'],
  ['A',  'A',  'Vertex with string value'   ],
  [0,     0,   'Vertex with zero value'     ],
];

for (const test of nodeNames) {
  const [par, expected, name] = test;
  const result = new Vertex(par);
  try {
    assert.strictEqual(result.value, expected, `Error in test "${name}"`);
  } catch (err) {
    console.log(err);
  }
}

const noValues = [
  ['',           'Vertex without a value'                  ],
  [null,         'Vertex with null in the value field'     ],
  [undefined,    'Vertex with undefined in the value field'],
  [-1,           'Vertex with negative value'              ],
];

for (const test of noValues) {
  const [par, name] = test;
  try {
    assert.throws(() => new Vertex(par), Error, `Error in test "${name}"`);
  } catch (err) {
    console.log(err);
  }
}

function testAddingNodes() {
  const node1 = new Vertex('A');
  const node2 = new Vertex('B');
  const node3 = new Vertex('C');
  node1.addNeighbour(node2, node3);
  assert.strictEqual(node1.edges.size, 2, 'Adding nodes');
}

function testAddingNodesChaining() {
  const node1 = new Vertex('A');
  const node2 = new Vertex('B');
  const node3 = new Vertex('C');
  const node4 = new Vertex('D');
  node1.addNeighbour(node2).addNeighbour(node3).addNeighbour(node4);
  assert.strictEqual(node1.edges.size, 3, 'Adding nodes using chaining');
}

function testRemovingNodes() {
  const node1 = new Vertex('A');
  const node2 = new Vertex('B');
  const node3 = new Vertex('C');
  node1.addNeighbour(node2, node3);
  node1.removeNeighbour(node3);
  assert.strictEqual(node1.edges.size, 1, 'Removing nodes');
}

function testRemovingNodesChaining() {
  const node1 = new Vertex('A');
  const node2 = new Vertex('B');
  const node3 = new Vertex('C');
  node1.addNeighbour(node2, node3)
    .removeNeighbour(node3).removeNeighbour(node2);
  assert.strictEqual(node1.edges.size, 0, 'Removing nodes using chaining');
}

const tests3 = [
  testAddingNodes,
  testAddingNodesChaining,
  testRemovingNodes,
  testRemovingNodesChaining,
];

for (const test of tests3) {
  try {
    test();
  } catch (err) {
    console.log(err);
  }
}
