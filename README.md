# MST-Algorithms

Implementation and comparison of several algorithms for finding Minimal Spanning Tree in graphs
=======
This repository is meant to compare three main algorithms for finding Minimum Spanning Tree: Kruskal's algorithm, Prim's algorithm and Boruvka's algorithm. Implementations of Boruvka's and Kruskal's algorithms are done with the help of Disjoint-set-union data structure in order to track down connectivity components of graph. Code includes four implementations of Prim's algorithm: based on adjacency matrix, adjacency list and using
Minimum Priority Queue and Indexed Minimum Priority Queue.

Each of implemented functions accepts graph as an argument and returns corresponding Minimum Spanning Tree represented by two-dimensional array. To maintain Graph data structure Map of vertices and Set of weighted edges are used. New graph can be created from adjacency matrix or simply by adding separate nodes or edges as following:

```
const matrix = [[0, 1, 4], [2, 0, 5], [4, 10, 0]];
const matGraph = Graph.from(matrix); //Creating graph from adjacency matrix

const graph = new Graph(); // Initializing empty graph
graph.addEdge(0, 2, 14).addEdge(1, 0, 10); // Adding edges to created graph
```

In order to run chosen algorithm on graph, just pass it as an argument to function. For example:

```
const MST = kruskalMST(graph);
```
### Results of the comparison

Although runtime of the functions representing each algorithm isn't constant, it is roughly the same for each time we run benchmark function. However, order of implemented algorithms with respect to speed of execution stays the same for each case. 

The sample of result of comparison:

| (index) | fnName | numOfIterations | execTime | percentage
| ---       |     ---    |          --- | ---   | ---   |
|  0  | 'boruvkaMST'   | 1000000   | 2.533388628 | 0 |
|  1  | 'kruskalMST'   | 1000000   | 3.286777184 | 8 |
|  2  | 'lazyPrimMST'  | 1000000   | 4.230197195 | 17|
|  3  | 'eagerPrimMST'  | 1000000   | 4.93268902  | 23|
|  4  | 'primAdjListMST' | 1000000   | 9.657440533  | 68|
|  5  | 'primMatrixMST'  | 1000000   | 13.093454228  | 100|
