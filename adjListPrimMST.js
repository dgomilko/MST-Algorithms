'use strict';

module.exports = function primAdjListMST(graph) {
  if (graph.isDirected) throw new Error('Graph should be undirected');
  const size = graph.size;
  const MST = [];
  const edges = [];
  const visited = [];
  let node = 0;
  while (MST.length !== size - 1) {
    visited.push(node);
    graph.getEdges(node).forEach(edge => edges.push(edge));
    const sorted = edges
      .filter(edge => visited.indexOf(edge[1]) === -1)
      .sort((a, b) => a[2] - b[2]);
    const minEdge = sorted.shift();
    edges.splice(edges.indexOf(minEdge), 1);
    MST.push(minEdge);
    node = minEdge[1];
  }
  return MST;
};
