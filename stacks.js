class _Node {
    constructor(data, next) {
        this.data = data;
        this.next = next;
    }
}

/*
A stack has two primary functions:

push(): places data onto the top of a stack
pop(): removes data from the top of the stack
*/

class Stack {
    constructor() {
        this.top = null;
    }

    push(data) {
        if (this.top === null) {
            this.top = new _Node(data, null);
            return this.top;
        }

        const node = new _Node(data, this.top);
        this.top = node;
    }

    pop() {
        const node = this.top;
        this.top = node.next;
        return node.data;
    }
}

module.exports = Stack;