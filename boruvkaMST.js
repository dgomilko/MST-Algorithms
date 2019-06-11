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

function union(parent, rank, source, destination) {
  const sourceSet = find(parent, source);
  const destinationSet = find(parent, destination);
  if (rank[sourceSet] < rank[destinationSet]) {
    parent[sourceSet] = destinationSet;
  } else if (rank[sourceSet] > rank[destinationSet]) {
    parent[destinationSet] = sourceSet;
  } else {
    parent[destinationSet] = sourceSet;
    rank[sourceSet] += 1;
  }
}

module.exports = function boruvkaMST(graph) {
  if (graph.isDirected) throw new Error('Graph should be undirected');
  let numOfTrees = graph.size;
  const MST = [];
  const edges = graph.getEdges();
  const rank = Array(numOfTrees).fill(0);
  const cheapest = Array(numOfTrees).fill([]);
  const parent = makeSet(numOfTrees);
  while (numOfTrees > 1) {
    for (const edge of edges) {
      const [source, destination, weight] = edge;
      const sourceSet = find(parent, source);
      const destinationSet = find(parent, destination);
      if (sourceSet !== destinationSet) {
        if (cheapest[sourceSet].length === 0 ||
          cheapest[sourceSet][2] > weight) cheapest[sourceSet] = edge;
        if (cheapest[destinationSet].length === 0 ||
          cheapest[destinationSet][2] > weight) cheapest[destinationSet] = edge;
      }
    }
    for (let i = 0; i < graph.size; i++) {
      if (cheapest[i]) {
        const [source, destination] = cheapest[i];
        const sourceSet = find(parent, source);
        const destinationSet = find(parent, destination);
        if (sourceSet !== destinationSet) {
          union(parent, rank, sourceSet, destinationSet);
          numOfTrees -= 1;
          MST.push(cheapest[i]);
        }
      }
    }
    cheapest.fill([]);
  }
  return MST;
};
