'use strict';

function makeSet(length) {
  const set = [];
  for (let i = 0; i < length; i++) set[i] = i;
  return set;
}

function find(parent, vertex) {
  if (parent[vertex] !== vertex) return find(parent, parent[vertex]);
  return vertex;
}

function union(parent, u, v) {
  const uSet = find(parent, u);
  const vSet = find(parent, v);
  parent[vSet] = uSet;
}

module.exports = function kruskalMST(graph) {
  if (graph.isDirected) throw new Error('Graph should be undirected');
  const MST = [];
  const edges = graph.getEdges();
  const sortedEdges = edges.sort((a, b) => a[2] - b[2]);
  const parent = makeSet(edges.length);
  let ind = 0;
  while (ind < graph.size - 1) {
    const edge = sortedEdges.shift();
    const [source, destination] = edge;
    const sourceSet = find(parent, source);
    const destinationSet = find(parent, destination);
    if (sourceSet !== destinationSet) {
      MST.push(edge);
      union(parent, sourceSet, destinationSet);
      ind++;
    }
  }
  return MST;
};
