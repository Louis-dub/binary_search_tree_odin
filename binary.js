import { Node } from "./nodeClass.js";

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        const node = new Node(array[0]);

        array.forEach(val => {
            let currentNode = node;
            let end = false;
            
            while(!end) {
                if (val < currentNode.value) {
                    if (currentNode.left) {
                        currentNode = currentNode.left;
                    } else {
                        currentNode.left = new Node(val);
                        end = true;
                    }
                } else if (val == currentNode.value) {
                    end = true;
                } else {
                    if (currentNode.right) {
                        currentNode = currentNode.right;
                    } else {
                        currentNode.right = new Node(val);
                        end = true;
                    }
                }
            }
        });

        return node;
    }

    toObject() {
        let treeObject = {
            val: this.root.value,
            left: null,
            right: null,
        };
        let list = [this.root];
        let objects = [treeObject];
        
        while(list.length > 0) {
            let curNode = list.shift();
            let curObj = objects.shift();
            if (curNode.left) {
                list.push(curNode.left);
                curObj.left = {
                    val: curNode.left.value,
                    left: null,
                    right: null,
                };
                objects.push(curObj.left);
            }
            if (curNode.right) {
                list.push(curNode.right);
                curObj.right = {
                    val: curNode.right.value,
                    left: null,
                    right: null,
                };
                objects.push(curObj.right);
            }
        }
        return treeObject;
    }
}

export { Tree };