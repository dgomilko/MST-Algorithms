'use strict';

const PriorityQueue = require('./priorityQueue');

function visit(vertex, graph, visited, pq) {
  visited[vertex] = true;
  const edges = graph.getEdges(vertex);
  for (const edge of edges) {
    const [, destination] = edge;
    if (!visited[destination]) pq.enqueue(edge);
  }
}

module.exports = function lazyPrimMST(graph) {
  if (graph.isDirected) throw new Error('Graph should be undirected');
  const size = graph.size;
  const visited = Array(size).fill(false);
  const pq = new PriorityQueue((a, b) => a[2] - b[2]);
  const MST = [];
  visit(0, graph, visited, pq);
  while (!pq.isEmpty() && MST.length < size - 1) {
    const edge = pq.extractMin();
    const [source, destination] = edge;
    if (visited[source] && visited[destination]) continue;
    MST.push(edge);
    if (!visited[source]) visit(source, graph, visited, pq);
    if (!visited[destination]) visit(destination, graph, visited, pq);
  }
  return MST;
};
