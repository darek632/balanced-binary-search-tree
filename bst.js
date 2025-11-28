export class Node { 
    constructor(data, left = null, right = null) { 
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

export class Tree { 
    constructor(array)  {
        this.root = this.buildTree(array); 
    }

   

        //prettyprint for printing tree in a viewable format
prettyPrint(node, prefix = '', isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }

};

    


    sortedArrToBSTRecur(arr, start, end) { 

        if(start > end) return null;
        // breakout clause

        let mid = start + Math.floor((end - start)/2);
        console.log('the middle is', mid);

        let root = new Node(arr[mid]);

        // recurisvely call left hand side and right hand side

        root.left = this.sortedArrToBSTRecur(arr, start, mid -1);
        root.right = this.sortedArrToBSTRecur(arr, mid +1,end);

        

        return root;

    }


    buildTree(array) { 

        let sorted = array.sort((a, b) => a - b);

        let s = new Set(sorted);

        let arrSortUniq = [...s];

        console.log(arrSortUniq);

       return this.sortedArrToBSTRecur (arrSortUniq, 0, arrSortUniq.length - 1);

        // sort array

        // delete duplicates 

        //find middle

        // if start > end return null (meaning there are not left/right nodes)
        // recursively call buildTree of left part starting from 0 to mid-1
        // recursively call buildTree of right part starting from mid+1 to length-1.

    
    }

    insert(value) { 
      
        let temp = new Node(value);

        if(this.root == null)
            {
                this.root = temp;
                return temp;
            } 

    let current = this.root;

    while( current !== null) { 
         if(current.data < value && current.right !== null) { 

            // i was confusing value > current.data with 
            // current.data > value
            // reading aloud in exact order it's written helps. 
        
            current = current.right;
        } else if( current.data > value && current.left !== null) { 
            
            current = current.left;
        } else  break;


    }
       if(current.data < value) current.right = temp;
       else current.left = temp;

       return this.root;
        
    }

    findSuccessor(node) { 

        // successor will be the node on RHS without a left child.
        //smallest node on RHS
        while(node.left !== null) {
            node = node.left;
        }

        return node;
    }

    findPredecessor(node) { 

        // biggest node on LHS 
        // move to RIGHT of node then find node without RHS child

        while(node.right !== null) { 
            node = node.right;
        }



    }

    deleteItem(value) { 

        // node has no children

      let current = this.root;
      let parent = null;

        while(current !== null ) {  
            
            if(value > current.data ) { 
                parent = current;
                current = current.right;
            } else if(value < current.data) { 
                parent = current;
                current = current.left;
            } else { 
                // foiund match aka value equals the data

                if(current.left == null && current.right == null) { 
                    if(parent == null) { 
                        this.root = null;
                    } else if(parent.left == current) { 
                        parent.left = null;
                    } else { 
                        parent.right = null
                    }

                   return;

                  // target node has right child ONLY
                } else if(current.left == null) { 
                  
                    if(parent == null) { 
                        this.root = current.right;

                    } else if(parent.left == current) { 
                        // check if target node is a LEFT child or a RIGHT child.
                        parent.left = current.right;
                    } else if(parent.right == current) { 
                        parent.right = current.right;
                    }

                 // target node has left child ONLY so assign parent to L
                } else if(current.right == null) { 
                   
                    if(parent == null) { 
                        this.root = current.left;
                    } else if(parent.left == current) { 
                        parent.left = current.left;
                    } else if(parent.right == current) { 
                        parent.right = current.left;
                    }
                } else { 
                    // reached a point where Node MUST HAVE 2 children.
                    // find in-order successor.

                    let successorParent = current;
                    let successor = current.right;

                    // right hand of node most left node. 

                    while(successor.left !== null) { 
                        successorParent = successor;
                        successor = successor.left;
                    }
                    current.data = successor.data;

                    if (successorParent.left === successor) {
                    successorParent.left = successor.right;
                    } else {
                        // Successor is direct right child
                        successorParent.right = successor.right;
                    }
                }
                


         return;

            }
     

        }

    
    }


    find(value) { 

        let current = this.root;

        while (current) { 
            if(current.data === value) { 
                return current;
            }
            if(value > current.data) { 
                current = current.right;
            } else if(value < current.data) {
                current = current.left;
            }
        }

        console.log('no match found');
        return;

        // completed
    }



    levelOrderRec(root, level, result, callback) {

        // base case

        if(root === null) return;


        if(result.length <= level) { 
            result.push([]);
        }

        result[level].push(root.data);
        // do something to each working node here

        if(callback) callback(root);

        this.levelOrderRec(root.left,level +1, result,callback);
        this.levelOrderRec(root.right,level +1, result, callback);
        
    }

    levelOrderForEach(callback) { 

        if(!callback) { 
            throw new Error("Please input a callback function.");
        }


        const queue = [this.root];
        const res = [];

        while(queue.length > 0) { 
            const node = queue.shift();
            if (node == null) continue;
        
        callback(node);
        res.push(node.data);

        queue.push(node.left);
        queue.push(node.right);

        }

        // this.levelOrderRec(this.root,0,res, callback)

        return res;
    }


    preOrderRec(root, result, callback) { 

        // root > left > right

        if(root == null) return;

        result.push(root.data);

        if(callback) callback(root)

        this.preOrderRec(root.left, result, callback);
        this.preOrderRec(root.right, result, callback);



    }

 preOrderForEach(callback) { 

     if(!callback) { 
            throw new Error("Please input a callback function.");
        }

    const res = [];

    this.preOrderRec(this.root, res, callback)

    return res;
 }

 inOrderRec(root, result, callback) { 

//left > root > right

    if(root == null) return;

    this.inOrderRec(root.left,result, callback);

    result.push(root.data);

    if(callback) callback(root);
    this.inOrderRec(root.right, result, callback);


 }

 inOrder(callback) { 

    //  if(!callback) { 
    //         throw new Error("Please input a callback function.");
    //     }

    const res = [];

    this.inOrderRec(this.root,res,callback);

    return res;
 }

 postOrderRec(root, result, callback) {

    // left > right > root

    if (root == null) return;

     this.postOrderRec(root.left, result, callback);
    

    this.postOrderRec(root.right, result,callback);

    result.push(root.data);

    if(callback) callback(root);

    

 }

 postOrder(callback) { 

    // with error catching. remove to test traversal order only.

     if(!callback) { 
            throw new Error("Please input a callback function.");
        }

    const res = [];

    this.postOrderRec(this.root, res, callback);

    return res;

 }

 heightRec(root) { 
    let lHeight = 0;
    let rHeight = 0;

    if(root == null) return -1;

    lHeight = this.heightRec(root.left);

    rHeight = this.heightRec(root.right);

    return Math.max(lHeight, rHeight) +1;
   
 }

 height(value) { 

    let current = this.root;

    while (current) { 


        if(value > current.data) { 
            current = current.right;
        } else if(value < current.data) { 
            current = current.left;
        } else { 

            if(current.data == value) { 
             const result = this.heightRec(current);   
             console.log(`The height of the searched value ${value} is ${result}`);
             return result;

        }
        


        }

        
    }
    return null;


 }

 depth(value) { 

    let d = 0;
    let current = this.root;

    while(current) { 
        if(value < current.data) { 
            d++;
            current = current.left;
        } else if(value > current.data) { 
            d++ 
            current = current.right;
        } else { 
            if(value === current.data) { 
                console.log("we've found the match", current);
                return d;
            }
        }
    }
    console.log('no match found');
    return null;
 }

 isBalanced(root) { 

    if (root == null) return true; 

    // children of leaf node are the breakout case.


    const lHeight = this.heightRec(root.left)
    const rHeight = this.heightRec(root.right);

    //calculate height of left side and right side. 


    if(Math.abs(lHeight - rHeight) > 1 ) return false;

    // if the difference between these is more than 1 than already false

    return this.isBalanced(root.left) && this.isBalanced(root.right);

    // otherwise recursively check inner branch balances
    // the AND operator will return TRUE if both sides match TRUE
    // meaning if any branch in either side balance is > 1 then will bubble up to FALSE for whole side 
    // and thus return FALSE for whole function


 }

 rebalance() {

    // check if balanced. 
    // if not balanced, 
    // inorderd traverse on the whole tree
    // call newtree using the result

    const result = this.isBalanced(this.root);
    if(!result) { 

        const newArray = this.inOrder();

    console.log(newArray);

    const newTree = new Tree(newArray);
    console.log('the tree was not balanced so the below is the new balanced tree:')

    return newTree;

    } else { 
        console.log('The tree is balanced:', result);
        return null;
    }

   

 }



}



// let sorted = [1, 5, 9, 14, 23, 27];

// let sample = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// let test = new Tree(sample);

// test.printTree(test.root);

// let arr = [
//    1, 3,  4, 5, 7, 8, 9, 23, 67, 324, 6345 
//]

// console.log('the root that should be passed to pretty print is',test.root);

// test.prettyPrint(test.root);


// test.insert(6500);
// test.insert(7123);
// test.insert(9999);
// test.insert(8888);

// test.prettyPrint(test.root);



// console.log(test.isBalanced(test.root));

// // console.log(test.inOrder());

// console.log(test.rebalance());

// const newTest = test.rebalance();


// newTest.prettyPrint(newTest.root);

// console.dir(test, {depth: null});










// console.log(test.height(5));

// console.log('the depth is', test.depth(123));





// test.deleteItem(23);

// test.deleteItem(5);
// test.deleteItem(324);
// test.deleteItem(67);

// console.log('the found node is:');

// const bread = test.levelOrderForEach(node => { console.log("Currently visiting:", node.data)});

// const noCallback = test.levelOrderForEach();

// console.log(test.preOrderForEach());

// const butter = test.preOrderForEach(node => { console.log("Preorder visit", node.data)});


// console.log(test.inOrder());

// const bread = test.inOrder(node => { console.log("Visting in ascending order:", node.data)});

// console.log(test.postOrder());






// console.log(test.find(67));



// console.log('after deleting 9 tree is:');

// test.prettyPrint(test.root);

// console.dir(test, {depth: null});
// console.log("after deleting:")
// test.prettyPrint(test.root);




// test.insert(20);



// 

// console.log(test);




// let start = 0;
// let end = arr.length - 1;

// let mid = start + Math.floor((end - start)/2);
// console.log(Math.floor((end - start)/2))



