'use strict';

const assert = require('assert');
const MinPriorityQueue = require('../priorityQueue.js');

const pq = new MinPriorityQueue();
pq.enqueue(10);
pq.enqueue(9);
pq.enqueue(7);
pq.enqueue(8);
pq.enqueue(3);
pq.enqueue(4);
pq.enqueue(5);
pq.enqueue(2);
pq.enqueue(1);
pq.enqueue(6);

function testEmpty() {
  assert.strictEqual(pq.isEmpty(), false, 'Should not be empty');
}

function testSize() {
  assert.strictEqual(pq.getSize(), 10, 'Size of queue');
}

function testComparator() {
  const comparator = pq.compare;
  const arr = [3, 2, 6, 1];
  const sorted = [1, 2, 3, 6];
  assert.deepStrictEqual(arr.sort(comparator), sorted, 'Default comparator');
}

function testExtraction() {
  for (let i = 1; i <= 10; i++) {
    assert.strictEqual(pq.extractMin(), i, 'Extracting element from queue');
    assert.strictEqual(pq.getSize(), 10 - i, 'Changing size while removing');
  }
}

function testAfterRemoval() {
  assert.strictEqual(pq.isEmpty(), true, 'Should be empty');
}

const tests = [
  testEmpty,
  testSize,
  testComparator,
  testExtraction,
  testAfterRemoval
];

for (const test of tests) {
  try {
    test();
  } catch (err) {
    console.log(err);
  }
}
