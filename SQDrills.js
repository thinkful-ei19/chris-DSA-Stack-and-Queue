const Queue = require('./queues');
const Stack = require('./stacks');

starTrek = new Stack()

starTrek.push('Scotty')
starTrek.push('Kirk')
starTrek.push('Spock')
starTrek.push('McCoy')


// console.log(starTrek)

function peek(stack) {
    console.log(starTrek.top.data)
}

// peek(starTrek)

function display(stack) {
    let currNode = stack.top;
    while (currNode.next !== null) {
        console.log(currNode.data)
        currNode = currNode.next;
    }
    console.log(currNode.data)
}

// display(starTrek)

function is_palindrome(s) {
    s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    // your code goes here
    // let revS = ''
    // let size = s.length;
    // let check = true
    // for (i=0; i < size; i++) {
    //     if (s[i] !== s[(size-1)-i]) {
    //         check = false
    //     };
    // }
    // return check

    //"Check for palindromes using stack"

    pStack = new Stack();
    for (i=0; i<s.length; i++) {
        pStack.push(s[i])
    }
    let currNode = pStack.top
    let string = ''
    while (currNode.next !== null) {
        string = string + currNode.data
        currNode = currNode.next
    }
    string = string + currNode.data
    // console.log(string, s)
    if (string === s) {
        return true
    } else {
        return false
    }
}

// true, true, true
// console.log(is_palindrome("dad"));
// console.log(is_palindrome("A man, a plan, a canal: Panama"));
// console.log(is_palindrome("1001"));
// console.log(is_palindrome("Tauhida"));
// is_palindrome("dad");
// is_palindrome("A man, a plan, a canal: Panama");
// is_palindrome("1001");
// is_palindrome("Tauhida");

function findError(arg) {

    arg = arg.toLowerCase().replace(/[a-zA-Z0-9+-/'"*]/g, "");
    // ({[  ]})
    let aStack = new Stack();
    for (i=0; i< arg.length; i++) {
        aStack.push(arg[i])
    }
    let brackets = 0;
    let parens = 0;
    let squares = 0;

    let currNode = aStack.top;
    while (currNode.next !== null) {
        if (currNode.next.data === '[') {
            if (currNode.data ===  ')' || currNode.data === '}') {
                return 'Error at: ' + currNode.next.data + currNode.data
            }
        } else if (currNode.next.data === '{') {
            if (currNode.data ===  ')' || currNode.data === ']') {
                return 'Error at: ' + currNode.next.data + currNode.data
            }
        } else if (currNode.next.data === '(') {
            if (currNode.data === ']' || currNode.data === '}') {
                return 'Error at: ' + currNode.next.data + currNode.data
            }
        }
        if (currNode.data === ']' || currNode.data === '[') {
            squares++
        } else if (currNode.data === '}' ||currNode.data === '{') {
            brackets++
        } else if (currNode.data === ')'|| currNode.data === '(') {
            parens++
        }
        currNode = currNode.next
    }
    if (currNode.data === ']' || currNode.data === '[') {
        squares++
    } else if (currNode.data === '}' ||currNode.data === '{') {
        brackets++
    } else if (currNode.data === ')'|| currNode.data === '(') {
        parens++
    }

    if (squares % 2 !== 0) {
        return 'Error: uneven amount of []'
    } else if (brackets % 2 !== 0) {
        return 'Error: uneven amount of {}'
    } else if (parens % 2 !== 0) {
        return 'Error: uneven amount of ()'
    }


    return 'No errors'
}

// console.log(findError('(12+3[)]'));
// console.log(findError('(12+3]'));
// console.log(findError('(12+3[])}'));
// console.log(findError('( [12+3] )'));

function findErrorQuotes(arg) {
    arg = arg.toLowerCase().replace(/[a-zA-Z0-9+-/*]/g, "");

    //First, find out of there is an even amount of "" or ''
    let count = 0;
    let countTwo = 0;
    let firstIndex = -1;

    let bStack = new Stack();
    for (i=0; i< arg.length; i++) {
        if (arg[i] === "'") {
            count++
            if (firstIndex === -1) {
                firstIndex = i
            }
        } else if (arg[i] === '"') {
            countTwo++
            if (firstIndex === -1) {
                firstIndex = i
            }
        }
        bStack.push(arg[i])
    }
    if (count % 2 !== 0) {
        return "Uneven amount of '"
    } else if (countTwo % 2 !== 0) {
        return 'Uneven amount of "'
    }

    let secondIndex = arg.length -1
    let string = ''

    let currNode = bStack.top;
    while (currNode.next !== null) {
        if (currNode.data === '"') {
            break
        } else if (currNode.data === "'") {
            break
        }
        secondIndex--
        currNode = currNode.next
    }
    //Then if valid, with the brackets outside of the quotes run the findError function passing in the sliced argument
    
    for (i=0; i<firstIndex; i++) {
        string = string + arg[i]
    }
    for (i=secondIndex; i<arg.length; i++) {
        string = string + arg[i]
    }

    return findError(string)
}

//I really, really should find a better solution. This week is proving how much I cowboy code too much.

// console.log(findErrorQuotes('(("[abc]"))'))
// console.log(findErrorQuotes("(['[abc]'])"))
// console.log(findErrorQuotes('("[abc])'))
// console.log(findErrorQuotes("('[abc])"))
// console.log(findErrorQuotes("('[abc]'[)"))
// console.log(findErrorQuotes("('[abc(')"))


sortStack = new Stack()

sortStack.push('abcdef')
sortStack.push('a')
sortStack.push('abc')
sortStack.push('ab')
sortStack.push('abcde')

function sort(stack) {
    let currNode = stack.top;
    let shuffled = false;
    while (currNode.next !== null) {
        if (currNode.data.length > currNode.next.data.length) {
            let placeholder = currNode.data
            currNode.data = currNode.next.data
            currNode.next.data = placeholder
            shuffled = true;
        }
        currNode = currNode.next;
        if (shuffled === true) {
            sort(stack);
        }
    }    
}

sort(sortStack)
// display(sortStack)

function createQueueFromStack(stack) {
//I'll leave it like this for now, but I think the instructions want me to do it differently.
    queue = new Queue()

    let currNode = stack.top;
    while (currNode.next !== null) {
        queue.enqueue(currNode.data)
        currNode = currNode.next;
    }

    return queue
}
createQueueFromStack(sortStack);

males = new Queue()
females = new Queue()

males.enqueue('Frank')
males.enqueue('John')
males.enqueue('Sherlock')
males.enqueue('David')
males.enqueue('Christopher')
females.enqueue('Jane')
females.enqueue('Madonna')
females.enqueue('Beyonce')

function dancePairing(m, f) {

    let firstMale = m.first;
    let firstFemale = f.first; 

    while (firstFemale && firstMale) {
        females.dequeue()
        males.dequeue()
        console.log(firstMale.value + ' ' + firstFemale.value + ' have been paired.')
        firstMale = m.first;
        firstFemale = f.first;
    }
    let count = 0;    
    if (firstMale) {
        currNode = firstMale
        while (currNode.prev !== null) {
            count++
            currNode = currNode.prev;
        }
        count++
        console.log(count + ' males still waiting for a dance partner.')
    }
    if (firstFemale) {
        currNode = firstFemale
        while (currNode.prev !== null) {
            count++
            currNode = currNode.prev;
        }
        count++
        console.log(count + ' females still waiting for a dance partner.')
    }

}

// dancePairing(males, females)

bankQueue = new Queue();

bankQueue.enqueue('John')
bankQueue.enqueue('Dexter')
bankQueue.enqueue('Amy')
bankQueue.enqueue('Bob')
bankQueue.enqueue('Emily')


function bankLine(q) {

    let currentPerson = bankQueue.first;
    
    while (currentPerson !== null) {
        if (currentPerson) {
            if (Math.random() < 0.25) {
                console.log(currentPerson.value + ' has faulty paperwork. Requeue.')
                bankQueue.enqueue(currentPerson.value)
                bankQueue.dequeue()
            }
            else {
                console.log(currentPerson.value + ' dequeued.')
                bankQueue.dequeue()
            }
        }
        currentPerson = bankQueue.first;
    }

}

bankLine(bankQueue)