'use strict';

const Graph = require('./graph.js');
const kruskalMST = require('./kruskalMST.js');
const boruvkaMST = require('./boruvkaMST.js');
const primLazyMST = require('./lazyPrimMST.js');
const primEagerMST = require('./eagerPrimMST.js');
const primMatrixMST = require('./matrixPrimMST.js');
const primAdjListMST = require('./adjListPrimMST.js');

const graph = new Graph();
const edges = [
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
for (const edge of edges) {
  graph.addEdge(...edge);
}

const algorithms = [
  kruskalMST,
  boruvkaMST,
  primLazyMST,
  primEagerMST,
  primMatrixMST,
  primAdjListMST
];

const INITIAL_COUNT = 10000;
const ITERATION_COUNT = 1000000;


function addPercentage(tests) {
  const bestRes = tests[0].execTime;
  const size = tests.length;
  const worstRes = tests[size - 1].execTime;
  const range = worstRes - bestRes;
  tests.forEach(a => (a.percentage = ((a.execTime - bestRes) * 100) / range));
  return tests;
}

function benchmark(func, arg) {
  const result = [];
  const fnName = func.name;
  for (let i = 0; i < INITIAL_COUNT; i++) result.push(func(arg));
  const start = process.hrtime.bigint();
  for (let i = 0; i < ITERATION_COUNT; i++) result.push(func(arg));
  const end = process.hrtime.bigint();
  const execTime = Number(end - start) / 1e9;
  const numOfIterations = result.length - 10000;
  return { fnName, numOfIterations, execTime };
}

const sortedResults = algorithms
  .map(fn => benchmark(fn, graph))
  .sort((a, b) => a.execTime - b.execTime);
const results = addPercentage(sortedResults);

console.table(results);
