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

test("Includes return true", () => {
    expect(tree.includes(8)).toBe(true);
});

test("Includes return false", () => {
    expect(tree.includes(33)).toBe(false);
});

test("Insert 25 in BST", () => {
    treeObject.right.right.right.left = {
        val: 25,
        left: null,
        right: null,
    };
    tree.insert(25);
    expect(tree.toObject()).toEqual(treeObject);
});

test("Insert in an empty BST", () => {
    const newTree = new Tree([]);
    newTree.insert(7);
    expect(newTree.toObject()).toEqual({
        val: 7,
        left: null,
        right: null,
    });
});

test("Delete one item", () => {
    treeObject.right.left.right = null;
    tree.deleteItem(5);
    expect(tree.toObject()).toEqual(treeObject);
});

test("Delete several items", () => {
    treeObject.right.right.right = null;
    tree.deleteItem(67);
    expect(tree.toObject()).toEqual(treeObject);
});

test("Delete non-exist item", () => {
    tree.deleteItem(13);
    expect(tree.toObject()).toEqual(treeObject);
});

test("levelOrderForEach method with a non-callback parameter", () => {
    expect(() => tree.levelOrderForEach("callback")).toThrow(new RangeError("A callback is required"));
});

test("levelOrderForEach passes correct values", () => {
    const visited = [];
    const mockCallback = jest.fn((value) => visited.push(value));

    tree.levelOrderForEach(mockCallback);

    expect(visited).toEqual([1, 7, 4, 23, 3, 8, 9]);
});

test("preOrderForEach method with a non-callback parameter", () => {
    expect(() => tree.preOrderForEach("callback")).toThrow(new RangeError("A callback is required"));
});

test("preOrderForEach passes correct values", () => {
    tree.insert(5);
    tree.insert(25);
    const visited = [];
    const mockCallback = jest.fn((value) => visited.push(value));

    tree.preOrderForEach(mockCallback);

    expect(visited).toEqual([1, 7, 4, 3, 5, 23, 8, 9, 25]);
});

test("inOrderForEach method with a non-callback parameter", () => {
    expect(() => tree.inOrderForEach("callback")).toThrow(new RangeError("A callback is required"));
});

test("inOrderForEach passes correct values", () => {
    const visited = [];
    const mockCallback = jest.fn((value) => visited.push(value));

    tree.inOrderForEach(mockCallback);

    expect(visited).toEqual([1, 3, 4, 5, 7, 8, 9, 23, 25]);
});

test("postOrderForEach method with a non-callback parameter", () => {
    expect(() => tree.postOrderForEach("callback")).toThrow(new RangeError("A callback is required"));
});

test("postOrderForEach passes correct values", () => {
    const visited = [];
    const mockCallback = jest.fn((value) => visited.push(value));

    tree.postOrderForEach(mockCallback);

    expect(visited).toEqual([3, 5, 4, 9, 8, 25, 23, 7, 1]);
});
