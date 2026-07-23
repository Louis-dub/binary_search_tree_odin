import { Node } from "./nodeClass.js";

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        if (array.length === 0) {
            return null;
        }
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

    includes(value) {
        let list = [this.root];

        while (list.length > 0) {
            let curNode = list.shift();
            if (curNode.value === value)
                return true;
            if (curNode.left)
                list.push(curNode.left);
            if (curNode.right)
                list.push(curNode.right);
        }
        return false;
    }

    insert(value) {
        if (!this.root) {
            this.root = new Node(value);
            return;
        }
        let currentNode = this.root;
        let end = false;
        
        while(!end) {
            if (value < currentNode.value) {
                if (currentNode.left) {
                    currentNode = currentNode.left;
                } else {
                    currentNode.left = new Node(value);
                    end = true;
                }
            } else if (value == currentNode.value) {
                end = true;
            } else {
                if (currentNode.right) {
                    currentNode = currentNode.right;
                } else {
                    currentNode.right = new Node(value);
                    end = true;
                }
            }
        }
    }

    deleteItem(value) {
        if (!this.root)
            return;
        if (this.root.value === value) {
            this.root = null;
            return;
        }

        let curNode = this.root;
        while (curNode !== null) {
            if (value < curNode.value) {
                if (!curNode.left) {
                    return;
                } else if (curNode.left.value === value) {
                    curNode.left = null;
                    return;
                } else {
                    curNode = curNode.left;
                }
            } else {
                if (!curNode.right) {
                    return;
                } else if (curNode.right.value === value) {
                    curNode.right = null;
                    return;
                } else {
                    curNode = curNode.right;
                }
            }
        }
    }

    levelOrderForEach(callback) {
        if (typeof callback !== "function")
            throw new RangeError("A callback is required");

        if (!this.root)
            return;
        let list = [this.root];

        while (list.length > 0) {
            let curNode = list.shift();

            callback(curNode.value);
            if (curNode.left)
                list.push(curNode.left);
            if (curNode.right)
                list.push(curNode.right);
        }
    }

    preOrderForEach(callback) {
        if (typeof callback !== "function")
            throw new RangeError("A callback is required");

        if (!this.root)
            return;
        let list = [this.root];

        while (list.length > 0) {
            let curNode = list[0];

            callback(curNode.value);
            if (curNode.left) {
                list.splice(1, 0, curNode.left);
                if (curNode.right)
                    list.splice(2, 0, curNode.right);
            } else {
                if (curNode.right)
                    list.splice(1, 0, curNode.right);
            }
            list.shift();
        }
    }

    inOrderForEach(callback) {
        if (typeof callback !== "function")
            throw new RangeError("A callback is required");

        if (!this.root)
            return;
        this.recIn(callback, this.root);
    }

    recIn(callback, node) {
        if (node.left)
            this.recIn(callback, node.left);
        callback(node.value);
        if (node.right)
            this.recIn(callback, node.right);
    }

    postOrderForEach(callback) {
        if (typeof callback !== "function")
            throw new RangeError("A callback is required");

        if (!this.root)
            return;
        this.recPost(callback, this.root);
    }

    recPost(callback, node) {
        if (node.left)
            this.recPost(callback, node.left);
        if (node.right)
            this.recPost(callback, node.right);
        callback(node.value);
    }

    height(value) {
        if (!this.root)
            return undefined;

        let curNode = this.root;
        let end = false;

        while (curNode && !end) {
            if (value < curNode.value)
                curNode = curNode.left;
            else if (value == curNode.value)
                end = true;
            else
                curNode = curNode.right;
        }

        if (!curNode)
            return undefined
        let list = [curNode];
        let height = [0];
        let i = 0;

        while (list.length > 0) {
            curNode = list.shift();
            if (curNode.left) {
                height.push(height[i] + 1);
                list.push(curNode.left);
            }
            if (curNode.right) {
                height.push(height[i] + 1);
                list.push(curNode.right);
            }
            i++;
        }

        return Math.max(...height);
    }

    depth(value) {
        let curNode = this.root;
        let end = false;
        let d = 0;

        while (curNode && !end) {
            d++;
            if (curNode.value > value)
                curNode = curNode.left;
            else if (curNode.value == value)
                end = true;
            else
                curNode = curNode.right;
        }

        if (!curNode)
            return undefined;
        return d - 1;
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