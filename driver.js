import { Tree, Node } from "./bst.js";

function randomArr(amount) {

let arr =[];
for(let i=0; i < amount; i++){ 
    let num = Math.floor(Math.random()*99);
    arr.push(num);
}
return arr;
}

let testArr = [ 12, 16, 39, 43, 45, 51, 65, 69, 81, 83, 87, 93];

// const treeBase = randomArr(15);

const test = new Tree(testArr);

test.prettyPrint(test.root);

console.log(test.isBalanced(test.root));

const levelArr = test.levelOrderForEach(node => { console.log('the current node in level order is:', node.data)});

// console.log(levelArr);

test.preOrderForEach(node => {console.log('pre-order traversal root > left > right:',node.data)});


test.postOrder(node => { console.log('post-order traversal, left > right > root,', node.data)});
// currently going from largest to smallest. 
test.inOrder(node => {console.log('in-order traversal left > root > right', node.data)});

test.insert(123);
test.insert(340);
test.insert(101);
test.insert(223);

test.prettyPrint(test.root);

console.log(test.isBalanced(test.root));

const reBalancedTree = test.rebalance();

reBalancedTree.prettyPrint(reBalancedTree.root);



const levelReBalanced = reBalancedTree.levelOrderForEach(node => { console.log('the current node in level order is:', node.data)});

// console.log(levelArr);

reBalancedTree.preOrderForEach(node => {console.log('pre-order for new tree root > left > right:',node.data)});


reBalancedTree.postOrder(node => { console.log('post-order  for new tree, left > right > root,', node.data)});
// currently going from largest to smallest. 
reBalancedTree.inOrder(node => {console.log('in-order for new tree left > root > right', node.data)});








