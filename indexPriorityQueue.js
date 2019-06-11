'use strict';

const customComparator = (a, b) => a - b;

module.exports = class IndexMinPQ {
  constructor(capacity, compare = customComparator) {
    this.keys = Array(capacity).fill(null);
    this.pq = Array(capacity).fill(0);
    this.positions = Array(capacity).fill(-1);
    this.size = 0;
    this.compare = compare;
  }

  swap(first, second) {
    const temp = this.pq[first];
    this.pq[first] = this.pq[second];
    this.pq[second] = temp;
  }

  less(a, b) {
    return this.compare(a, b) < 0;
  }

  swim(index) {
    while (index > 1) {
      const parent = Math.floor(index / 2);
      const indexValue = this.pq[index];
      const parentValue = this.pq[parent];
      if (this.less(this.keys[indexValue], this.keys[parentValue])) {
        this.swap(index, parent);
        this.positions[indexValue] = index;
        this.positions[parentValue] = parent;
        index = parent;
      } else break;
    }
  }

  sink(index) {
    while (2 * index <= this.size) {
      let child = index * 2;
      if (child < this.size &&
        this.less(this.keys[this.pq[child + 1]], this.keys[this.pq[child]])) {
        child++;
      }
      if (this.less(this.keys[this.pq[child]], this.keys[this.pq[index]])) {
        this.swap(index, child);
        this.positions[this.pq[index]] = index;
        this.positions[this.pq[child]] = child;
        index = child;
      } else break;
    }
  }

  insert(index, key) {
    this.keys[index] = key;
    this.pq[++this.size] = index;
    this.positions[index] = this.size;
    this.swim(this.size);
  }

  decreaseKey(index, key) {
    if (this.less(key, this.keys[index])) {
      this.keys[index] = key;
      this.swim(this.positions[index]);
    }
  }

  increaseKey(index, key) {
    if (this.less(this.keys[index], key)) {
      this.keys[index] = key;
      this.sink(this.positions[index]);
    }
  }

  minKey() {
    return this.keys[this.pq[1]];
  }

  getMin() {
    return this.pq[1];
  }

  delMin() {
    const key = this.pq[1];
    const size = this.size;
    this.swap(1, size);
    this.positions[this.pq[1]] = 1;
    this.positions[this.pq[size]] = -1;
    this.keys[this.pq[size]] = null;
    this.size--;
    this.sink(1);
    return key;
  }

  hasIndex(index) {
    return this.positions[index] !== -1;
  }

  isEmpty() {
    return this.size === 0;
  }
};
