'use strict';

const Vertex = require('./graphVertex.js');

function isSymmetric(matrix) {
  const length = matrix.length;
  for (const row of matrix) {
    if (row.length !== length) throw new Error('Matrix must be symmetric');
  }
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (matrix[i][j] !== matrix[j][i]) return false;
    }
  }
  return true;
}

module.exports = class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected;
    this.vertices = new Map();
    this.edgeWeights = new Set();
  }

  static from(matrix) {
    const graph = new Graph(!isSymmetric(matrix));
    const length = matrix.length;
    if (!graph.isDirected) {
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
          if (i < j && matrix[i][j]) graph.addEdge(i, j, matrix[i][j]);
        }
      }
    } else
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
          if (matrix[i][j]) graph.addEdge(i, j, matrix[i][j]);
        }
      }
    return graph;
  }

  addVertex(...vertices) {
    const added = [];
    for (const value of vertices) {
      if (!this.vertices.has(value)) {
        const node = new Vertex(value);
        this.vertices.set(value, node);
        added.push(node);
      } else added.push(this.vertices.get(value));
    }
    return added;
  }

  removeVertex(...vertices) {
    for (const vertex of vertices) {
      if (this.vertices.has(vertex)) {
        const node = this.vertices.get(vertex);
        this.vertices.delete(vertex);
        this.vertices.forEach(value => value.removeNeighbour(node));
        for (const edge of this.edgeWeights.keys()) {
          const nodes = edge.slice(0, 2);
          if (nodes.includes(vertex)) this.edgeWeights.delete(edge);
        }
      }
    }
    return this;
  }

  setEdgeWeight(source, destination, weight) {
    if (this.vertices.has(source) && this.vertices.has(destination)) {
      this.edgeWeights.add([source, destination, weight]);
    }
    return this;
  }

  getEdgeWeight(source, destination) {
    for (const edge of this.edgeWeights.keys()) {
      const [start, final, weight] = edge;
      if ((start === source && final === destination) ||
        (!this.isDirected && final === source && start === destination)) {
        return weight;
      }
      return -1;
    }
  }

  addEdge(source, destination, weight) {
    const [sourceNode, destinationNode] = this.addVertex(source, destination);
    if (sourceNode && destinationNode) sourceNode.addNeighbour(destinationNode);
    if (!this.isDirected) destinationNode.addNeighbour(sourceNode);
    if (weight) this.setEdgeWeight(source, destination, weight);
    return this;
  }

  removeEdge(source, destination) {
    const sourceNode = this.vertices.get(source);
    const destinationNode = this.vertices.get(destination);
    if (sourceNode && destinationNode) {
      sourceNode.removeNeighbour(destinationNode);
      if (!this.isDirected) destinationNode.removeNeighbour(sourceNode);
    }
    for (const edge of this.edgeWeights.keys()) {
      const [start, final] = edge;
      if ((start === source && final === destination) ||
        (!this.isDirected && final === source && start === destination)) {
        this.edgeWeights.delete(edge);
        break;
      }
    }
    return this;
  }

  getEdges(vertex) {
    const result = [];
    if (!vertex && vertex !== 0) return [...this.edgeWeights.keys()];
    for (const edge of this.edgeWeights.keys()) {
      const [source] = edge;
      if (vertex === source) result.push(edge);
    }
    return result;
  }

  getAdjacentNodes(vertex) {
    const result = [];
    const node = this.vertices.get(vertex);
    for (const vertex of node.getNeighbours()) result.push(vertex.value);
    return result;
  }

  getAdjacencyList() {
    const list = new Map();
    for (const vertex of this.vertices.keys()) {
      const nodes = this.getEdges(vertex);
      list.set(vertex, nodes);
    }
    return list;
  }

  getAdjacencyMatrix() {
    const size = this.vertices.size;
    const adjMatrix = Array(size)
      .fill()
      .map(() => Array(size).fill(0));
    for (const edge of this.edgeWeights.keys()) {
      const [start, final, weight] = edge;
      adjMatrix[start][final] = weight;
      if (!this.isDirected) adjMatrix[final][start] = weight;
    }
    return adjMatrix;
  }

  get size() {
    return this.vertices.size;
  }
};
