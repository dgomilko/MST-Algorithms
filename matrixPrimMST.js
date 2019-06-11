'use strict';

module.exports = function primMatrixMST(graph) {
  if (graph.isDirected) throw new Error('Graph should be undirected');
  const matrix = graph.getAdjacencyMatrix();
  const size = graph.size;
  const MST = [];
  const edges = [];
  const visited = [];
  let minEdge = [-1, -1, Infinity];
  let node = 0;
  while (MST.length !== size - 1) {
    visited.push(node);
    for (let i = 0; i < size; i++) {
      if (matrix[node][i] !== 0) edges.push([node, i, matrix[node][i]]);
    }
    for (let j = 0; j < edges.length; j++) {
      if (edges[j][2] < minEdge[2] && visited.indexOf(edges[j][1]) === -1) {
        minEdge = edges[j];
      }
    }
    edges.splice(edges.indexOf(minEdge), 1);
    MST.push(minEdge);
    node = minEdge[1];
    minEdge = [-1, -1, Infinity];
  }
  return MST;
};
