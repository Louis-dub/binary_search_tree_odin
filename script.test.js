import { Tree } from "./binary.js";

let treeObject = {
    val: 1,
    left: null,
    right: {
        val: 7,
        left: {
            val: 4,
            left: {
                val: 3,
                left: null,
                right: null,
            },
            right: {
                val: 5,
                left: null,
                right: null,
            },
        },
        right: {
            val: 23,
            left: {
                val: 8,
                left: null,
                right: {
                    val: 9,
                    left: null,
                    right: null,
                },
            },
            right: {
                val: 67,
                left: null,
                right: {
                    val: 6345,
                    left: {
                        val: 324,
                        left: null,
                        right: null,
                    },
                    right: null,
                },
            },
        },
    },
};

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

test("Create of tree", () => {
    expect(tree.toObject()).toEqual(treeObject);
});