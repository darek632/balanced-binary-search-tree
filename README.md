# Balanced binary search tree class with various traversal and modifying methods.

## A project aimed at learning about data structures and binary search trees. The methods created aim to incorporate the main attributes of a binary search tree.

A balanced binary search tree is one where the root is the middle value of a sorted unique array. The node to the left is always smaller than the root and the node to the left will always be 
bigger than the root. The balance section means that the height difference between left side and right side is at most 1.

The class creates a balanced binary search tree from an array of values. The main methods of the balanced binary search tree are:

* The buildTree method which builds the original tree, using recursion, to divide the array into smaller arrays and sort each node to the left/right of the previous node depending whether it's
* smaller or bigger.
* InsertV(value) will insert a new node to the tree. 
* Delete(value) will delete the target node and readjust the remaining branches to ensure tree stays balanced.
* Find(value) returns the node with the target value.
* Level order traversal method which is a breadth-first search. This uses a queue where each node is recorded and then a reference of it's children is sent to the back of the q,
*  ensuring every level gets recorded first before moving on to the next-level down.
*  In, pre and post-order traversal methods which traverse the tree in the order specified.
*  height method which returns the height of a target node containing the value. Height is how far it is to leaf node, with leaf node starting at 0.
*  Depth method, which returns the depth of a target note. The depth is how far down from root node the target is located.
*  isBalanced method which returns true or false whether the tree is balanced (ie the difference between left side and right side height is at most 1)
*  reBalance which if tree is not balanced, traverses through the current tree to gather data values in array. This array is then used to create a new balanced tree.

Evaluation in google docs.
