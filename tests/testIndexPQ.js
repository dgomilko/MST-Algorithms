'use strict';

const assert = require('assert');
const IndexMinPQ = require('../indexPriorityQueue.js');

const pq = new IndexMinPQ(100);

function testCapacity() {
  const tested = [pq.keys.length, pq.pq.length, pq.positions.length];
  for (const test of tested) assert.strictEqual(test, 100, 'Setting capacity');
}

function testInserting() {
  assert.strictEqual(pq.hasIndex(10), false, 'Non-existing index');
  pq.insert(10, 12);
  assert.strictEqual(pq.hasIndex(10), true, 'Adding index');
}

function testComparator() {
  const comparator = pq.compare;
  const arr = [3, 2, 6, 1];
  const sorted = [1, 2, 3, 6];
  assert.deepStrictEqual(arr.sort(comparator), sorted, 'Default comparator');
}

function testMin() {
  pq.insert(9, 14);
  assert.strictEqual(pq.hasIndex(9), true, 'Adding index');
  assert.strictEqual(pq.getMin(), 10, 'Getting minimal index');
}

function testMinKey() {
  assert.strictEqual(pq.minKey(), 12, 'Getting minimal key');
}

function testDecreaseKey() {
  pq.decreaseKey(10, 13);
  assert.strictEqual(pq.minKey(), 12, 'Trying to increase key value');
  pq.decreaseKey(10, 11);
  assert.strictEqual(pq.minKey(), 11, 'Decreasing key value');
  pq.decreaseKey(9, 10);
  assert.strictEqual(pq.minKey(), 10, 'Getting new minimal key');
  assert.strictEqual(pq.getMin(), 9, 'Getting new minimal index');
}

function testAfterChanges() {
  assert.strictEqual(pq.size, 2, 'Getting size after changes');
  assert.strictEqual(pq.isEmpty(), false, 'Should not be empty');
}

function testDelMin() {
  assert.strictEqual(pq.delMin(), 9, 'Deleting minimal index');
  assert.strictEqual(pq.delMin(), 10, 'Deleting minimal index');
  assert.strictEqual(pq.isEmpty(), true, 'Should be empty');
}

const tests = [
  testCapacity,
  testInserting,
  testComparator,
  testMin,
  testMinKey,
  testDecreaseKey,
  testAfterChanges,
  testDelMin
];

for (const test of tests) {
  try {
    test();
  } catch (err) {
    console.log(err);
  }
}
