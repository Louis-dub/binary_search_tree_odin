import { Tree } from "./binary.js";

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.insert(25);
tree.deleteItem(5);
tree.deleteItem(67);
tree.deleteItem(13);
tree.insert(25);
console.log("Tree:");
prettyPrint(tree.root);
// prettyPrint(new Tree([8, 4, 2, 1, 3, 6, 5, 7, 12, 14, 13, 15, 10, 9, 11]).root)
// console.log("\nJSON:")
// console.log(JSON.stringify(tree.toObject(), null, 2));