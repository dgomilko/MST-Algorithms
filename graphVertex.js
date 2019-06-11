'use strict';

module.exports = class Vertex {
  constructor(value) {
    if (value < 0 || (!value && value !== 0)) {
      throw new Error('Graph vertex must have a value');
    }
    this.value = value;
    this.edges = new Set();
  }

  addNeighbour(...vertices) {
    for (const vertex of vertices) {
      if (!this.edges.has(vertex)) this.edges.add(vertex);
    }
    return this;
  }

  removeNeighbour(...vertices) {
    for (const vertex of vertices) {
      if (this.edges.has(vertex)) this.edges.delete(vertex);
    }
    return this;
  }

  getNeighbours() {
    return this.edges;
  }
};
