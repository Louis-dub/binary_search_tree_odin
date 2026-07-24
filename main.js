import { Tree } from "./binary.js";

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}


function createRandomTree() {
    const nodes = [];

    for (let i = 0; i < 12; i++) {
        let num = Math.floor(Math.random() * 100);

        while (nodes.includes(num))
            num = Math.floor(Math.random() * 100);
        nodes.push(num);
    }
    const tree = new Tree(nodes);
    return tree;
}

const tree = createRandomTree();

console.log("Tree:");
prettyPrint(tree.root);

let listNode = [];
tree.preOrderForEach((val) => listNode.push(val));
console.log("\nPre Order: " + listNode.join(" - "));

listNode = [];
tree.inOrderForEach((val) => listNode.push(val));
console.log("In Order: " + listNode.join(" - "));

listNode = [];
tree.postOrderForEach((val) => listNode.push(val));
console.log("Post Order: " + listNode.join(" - "));

tree.insert(97);
tree.insert(16);
tree.insert(3);
console.log("\nTree:")
prettyPrint(tree.root);

console.log(`\nTree balanced: ${tree.isBalanced()}`);
tree.rebalance();
prettyPrint(tree.root);