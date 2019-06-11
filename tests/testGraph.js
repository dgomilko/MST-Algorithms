'use strict';

const assert = require('assert');
const Graph = require('../graph.js');

function testAddingNodes() {
  const graph = new Graph();
  const vertices = ['A', 'B', 'C'];
  for (const vertex of vertices) {
    graph.addVertex(vertex);
    assert.strictEqual(
      graph.vertices.has(vertex),
      true,
      `Adding vertice ${vertex}`
    );
  }
  assert.strictEqual(graph.size, 3, 'Adding vertices');
}

function testAddingMultipleNodes() {
  const graph = new Graph();
  const vertices = ['A', 'B', 'C'];
  graph.addVertex(...vertices);
  for (const vertex of vertices) {
    assert.strictEqual(
      graph.vertices.has(vertex),
      true,
      `Adding vertice ${vertex}`
    );
  }
  assert.strictEqual(graph.size, 3, 'Adding vertices');
}

function testRemovingNodes() {
  const graph = new Graph();
  graph.addVertex('A', 'B');
  graph.removeVertex('A');
  assert.strictEqual(graph.size, 1, 'Removing vertices');
  assert.strictEqual(graph.vertices.has('B'), true, 'Adding vertice B');
  assert.strictEqual(graph.vertices.has('A'), false, 'Removing vertice A');
}

function testRemovingMultipleNodes() {
  const graph = new Graph();
  graph.addVertex('C', 'D');
  graph.removeVertex('D', 'C');
  assert.strictEqual(graph.size, 0, 'Removing multiple vertices');
}

function testRemovingNodesChaining() {
  const graph = new Graph();
  const vertices = ['D', 'E', 'F'];
  graph.addVertex(...vertices);
  graph
    .removeVertex('D')
    .removeVertex('E')
    .removeVertex('F');
  assert.strictEqual(graph.size, 0, 'Removing vertices');
  for (const vertex of vertices) {
    assert.strictEqual(
      graph.vertices.has(vertex),
      false,
      `Removing vertice ${vertex}`
    );
  }
}

function testAddingUndirectedEdge() {
  const graph = new Graph();
  graph.addVertex('A', 'B', 'C');
  graph.addEdge('A', 'C');
  assert.strictEqual(
    graph.vertices.get('A').edges.size,
    1,
    'Adding adjacent node in undirected graph'
  );
  assert.strictEqual(
    graph.vertices.get('C').edges.size,
    1,
    'Double-sided adding of adjacent node in undirected graph'
  );
  assert.strictEqual(
    graph.vertices.get('B').edges.size,
    0,
    'Isolated vertice in undirected graph'
  );
}

function testAddingDirectedEdge() {
  const graph = new Graph(true);
  graph.addVertex('A', 'B', 'C');
  graph.addEdge('A', 'C');
  assert.strictEqual(
    graph.vertices.get('A').edges.size,
    1,
    'Adding adjacent node in directed graph'
  );
  assert.strictEqual(
    graph.vertices.get('C').edges.size,
    0,
    'One-sided adding of adjacent node in directed graph'
  );
  assert.strictEqual(
    graph.vertices.get('B').edges.size,
    0,
    'Isolated vertice in directed graph'
  );
}

function testAddingNodesWithEdges() {
  const graph = new Graph(true);
  graph.addEdge('A', 'B');
  assert.strictEqual(
    graph.vertices.has('A'),
    true,
    'Adding node A while adding edge'
  );
  assert.strictEqual(
    graph.vertices.has('B'),
    true,
    'Adding node B while adding edge'
  );
}

function testAddingNodesChaining() {
  const graph = new Graph();
  graph
    .addEdge('A', 'B')
    .addEdge('A', 'C')
    .addEdge('D', 'A');
  assert.strictEqual(
    graph.getAdjacentNodes('A').length,
    3,
    'Adding edges using chaining'
  );
}

function testRemovingUndirectedEdges() {
  const graph = new Graph();
  graph
    .addEdge('A', 'B')
    .addEdge('A', 'C')
    .addEdge('D', 'A');
  graph.removeEdge('A', 'D');
  assert.strictEqual(
    graph.getAdjacentNodes('A').length,
    2,
    'Removing edges in undirected graph'
  );
  assert.strictEqual(
    graph.vertices.has('D'),
    true,
    'Removing edge doesn\'t remove vertex in undirected graph'
  );
}

function testRemovingDirectedEdges() {
  const graph = new Graph(true);
  graph
    .addEdge('A', 'B')
    .addEdge('A', 'C')
    .addEdge('D', 'A');
  graph.removeEdge('A', 'D');
  graph.removeEdge('A', 'C');
  assert.strictEqual(
    graph.getAdjacentNodes('A').length,
    1,
    'Removing edges in directed graph'
  );
  assert.strictEqual(
    graph.vertices.has('C'),
    true,
    'Removing edge doesn\'t remove vertex in directed graph'
  );
}

function testRemovingEdgesChaining() {
  const graph = new Graph();
  graph
    .addEdge('A', 'B')
    .addEdge('A', 'C')
    .addEdge('D', 'A')
    .removeEdge('A', 'D')
    .removeEdge('A', 'C');
  assert.strictEqual(
    graph.getAdjacentNodes('A').length,
    1,
    'Removing edges using chaining'
  );
}

function testRemovingEdgesWithNodes() {
  const graph = new Graph();
  graph
    .addEdge('F', 'G', 3)
    .addEdge('F', 'H', 4)
    .addEdge('K', 'F', 6)
    .removeVertex('F');
  assert.strictEqual(
    graph.edgeWeights.size,
    0,
    'Deleting corresponding edges when node is removed'
  );
}

function testGettingWeights() {
  const graph = new Graph();
  graph.addEdge('A', 'B', 3);
  assert.strictEqual(
    graph.getEdgeWeight('A', 'B'),
    3,
    'Getting weight of an edge'
  );
}

function testAddingWeights() {
  const graph = new Graph();
  graph
    .addEdge('A', 'B')
    .setEdgeWeight('A', 'B', 15)
    .setEdgeWeight('G', 'H', 10);
  assert.strictEqual(
    graph.getEdgeWeight('A', 'B'),
    15,
    'Adding weight to existing edge'
  );
  assert.strictEqual(
    graph.getEdgeWeight('G', 'H'),
    -1,
    'Adding weight to non-existing edge'
  );
}

function testNonSquareMatrix() {
  const matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]];
  assert.throws(() => Graph.from(matrix), Error);
}

function testSymmetricMatrix() {
  const matrix = [[0, 2, 4], [2, 0, 10], [4, 10, 0]];
  const graph = Graph.from(matrix);
  assert.strictEqual(
    graph.isDirected,
    false,
    'Creating undirected graph from symmetric matrix'
  );
}

function testAsymmetricMatrix() {
  const matrix = [[0, 1, 4], [2, 0, 5], [4, 10, 0]];
  const graph = Graph.from(matrix);
  assert.strictEqual(
    graph.isDirected,
    true,
    'Creating directed graph from asymmetric matrix'
  );
}

function testGettingMatrix() {
  const matrix = [[0, 1, 4], [2, 0, 5], [4, 10, 0]];
  const graph = Graph.from(matrix);
  assert.deepStrictEqual(
    graph.getAdjacencyMatrix(),
    matrix,
    'Building an adjacency matrix'
  );
}

function testGettingEdges() {
  const matrix = [[0, 2, 4], [2, 0, 10], [4, 10, 0]];
  const graph = Graph.from(matrix);
  assert.strictEqual(graph.getEdges(0).length, 2, 'Getting incident edges');
  assert.strictEqual(graph.getEdges().length, 3, 'Getting all edges');
}

function testGettingAdjList() {
  const matrix = [[0, 2, 4], [2, 0, 10], [4, 10, 0]];
  const graph = Graph.from(matrix);
  assert.strictEqual(
    graph.getAdjacencyList().size,
    3,
    'Getting adjacency list'
  );
  assert.strictEqual(
    graph.getAdjacencyList().get(0).length,
    2,
    'Checking adjacency list for a vertex'
  );
}

const tests = [
  testAddingNodes,
  testAddingMultipleNodes,
  testRemovingNodes,
  testRemovingMultipleNodes,
  testRemovingNodesChaining,
  testAddingUndirectedEdge,
  testAddingDirectedEdge,
  testAddingNodesWithEdges,
  testAddingNodesChaining,
  testRemovingUndirectedEdges,
  testRemovingDirectedEdges,
  testRemovingEdgesChaining,
  testRemovingEdgesWithNodes,
  testGettingWeights,
  testAddingWeights,
  testNonSquareMatrix,
  testSymmetricMatrix,
  testAsymmetricMatrix,
  testGettingMatrix,
  testGettingEdges,
  testGettingAdjList
];

for (const test of tests) {
  try {
    test();
  } catch (err) {
    console.log(err);
  }
}
