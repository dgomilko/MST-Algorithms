'use strict';

const customComparator = (a, b) => a - b;

module.exports = class PriorityQueue {
  constructor(compare = customComparator) {
    this.queue = [];
    this.size = 0;
    this.compare = compare;
  }

  swap(first, second) {
    const temp = this.queue[first];
    this.queue[first] = this.queue[second];
    this.queue[second] = temp;
  }

  less(a, b) {
    return this.compare(a, b) < 0;
  }

  swim(index) {
    while (index > 1) {
      const parent = Math.floor(index / 2);
      if (this.less(this.queue[index], this.queue[parent])) {
        this.swap(index, parent);
        index = parent;
      } else break;
    }
  }

  sink(index) {
    while (index * 2 <= this.size) {
      let child = 2 * index;
      if (child < this.size &&
        this.less(this.queue[child + 1], this.queue[child])) child++;
      if (this.less(this.queue[child], this.queue[index])) {
        this.swap(child, index);
        index = child;
      } else break;
    }
  }

  enqueue(item) {
    while (this.queue.lengh <= this.size + 1) this.queue.push(0);
    this.queue[++this.size] = item;
    this.swim(this.size);
  }

  extractMin() {
    if (this.size !== 0) {
      const item = this.queue[1];
      this.swap(1, this.size--);
      this.sink(1);
      return item;
    }
  }

  getSize() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }
};
