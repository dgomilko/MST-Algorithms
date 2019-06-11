'use strict';

const assert = require('assert');
const lazyPrim = require('../lazyPrimMST.js');
const eagerPrim = require('../eagerPrimMST.js');
const matrixPrim = require('../matrixPrimMST.js');
const adjListPrim = require('../adjListPrimMST.js');
const Graph = require('../graph.js');

const edgesA = [
  [0, 1, 2],
  [0, 3, 6],
  [1, 2, 3],
  [1, 3, 8],
  [1, 4, 5],
  [2, 4, 7],
  [3, 4, 9]
];
const resultA = [
  [0, 1, 2],
  [1, 2, 3],
  [1, 4, 5],
  [0, 3, 6]
];

const edgesB = [
  [0, 1, 7],
  [0, 3, 5],
  [1, 2, 8],
  [1, 3, 9],
  [1, 4, 10],
  [2, 4, 13],
  [3, 4, 1],
  [3, 5, 4],
  [4, 5, 2],
  [4, 6, 20],
  [5, 6, 11]
];
const resultB = [
  [0, 3, 5],
  [3, 4, 1],
  [4, 5, 2],
  [0, 1, 7],
  [1, 2, 8],
  [5, 6, 11]
];

const tests = [
  [edgesA, resultA],
  [edgesB, resultB]
];

const functions = [lazyPrim, eagerPrim, matrixPrim, adjListPrim];

for (const test of tests) {
  const [edges, expected] = test;
  const graph = new Graph();
  for (const edge of edges) graph.addEdge(...edge);
  try {
    functions.forEach(fn => assert.deepStrictEqual(fn(graph), expected));
  } catch (err) {
    console.log(err);
  }
}
