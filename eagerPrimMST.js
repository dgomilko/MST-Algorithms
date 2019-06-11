'use strict';

const IndexMinPQ = require('./indexPriorityQueue.js');

function visit(vertex, graph, visited, pq) {
  visited[vertex] = true;
  const edges = graph.getEdges(vertex);
  for (const edge of edges) {
    const [, destination] = edge;
    if (visited[destination]) continue;
    if (pq.hasIndex(destination)) pq.decreaseKey(destination, edge);
    else pq.insert(destination, edge);
  }
}

module.exports = function eagerPrimMST(graph) {
  if (graph.isDirected) throw new Error('Graph should be undirected');
  const size = graph.size;
  const pq = new IndexMinPQ(size, (a, b) => a[2] - b[2]);
  const visited = Array(size).fill(false);
  const MST = [];
  visit(0, graph, visited, pq);
  while (!pq.isEmpty()) {
    const edge = pq.minKey();
    const vertex = pq.delMin();
    MST.push(edge);
    if (!visited[vertex]) visit(vertex, graph, visited, pq);
  }
  return MST;
};
