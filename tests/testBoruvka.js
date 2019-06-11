'use strict';

const assert = require('assert');
const boruvkaMST = require('../boruvkaMST.js');
const Graph = require('../graph.js');

const edgesA = [
  [0, 1, 10],
  [0, 2, 6],
  [0, 3, 5],
  [1, 3, 15],
  [2, 3, 4],
];
const resultA = [
  [0, 3, 5],
  [0, 1, 10],
  [2, 3, 4],
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
  [0, 1, 7],
  [1, 2, 8],
  [3, 4, 1],
  [4, 5, 2],
  [5, 6, 11]
];

const edgesC = [
  [0, 1, 4],
  [0, 2, 3],
  [1, 2, 1],
  [1, 3, 2],
  [2, 3, 4],
  [3, 4, 2],
  [4, 5, 6]
];
const resultC = [
  [0, 2, 3],
  [1, 2, 1],
  [1, 3, 2],
  [3, 4, 2],
  [4, 5, 6]
];

const tests = [
  [edgesA, resultA],
  [edgesB, resultB],
  [edgesC, resultC],
];

for (const test of tests) {
  const [edges, expected] = test;
  const graph = new Graph();
  for (const edge of edges) graph.addEdge(...edge);
  try {
    assert.deepStrictEqual(boruvkaMST(graph), expected);
  } catch (err) {
    console.log(err);
  }
}
