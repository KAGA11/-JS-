class Stack {
    constructor(){
        this.item = [];
    }
    // push pop peek isEmpty clear size
    push(element){
        this.item.push(element)
    }
    pop(){
        return this.item.pop();
    }
    peek(){
        return this.item[this.item.length -1]
    }
    isEmpty(){
        return this.item.length === 0
    }
    clear(){
        this.item = []
    }
    size(){
        return this.item.length
    }
}

const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)
console.log(stack);
stack.pop()
console.log(stack);
console.log(stack.peek());
console.log('size: ',stack.size());
stack.clear()
console.log(stack.isEmpty());


// 栈的实际应用其1 十进制转2进制 decimal 10 转成 binary 1010
// 思路: 
// (10 / 2 = 5, rem = 0) 
// (5 / 2 = 2, rem = 1) 
// (2 / 2 = 1, rem = 0) 
// (1 / 2 = 0 (取整), rem = 1) 
// 结果输出倒过来 1010 也就是后进先出, 维护一个栈来储存每一次的余数


const decNumber = 10
const binary = decimalToBinary(decNumber)
console.log(binary);

// 实现
function decimalToBinary(decNumber){
    const remStack = new Stack()
    let number = decNumber;
    let rem;
    let binary = ''
    while(number > 0){
        rem = Math.floor(number % 2)
        remStack.push(rem)
        // 确保是整数
        number = Math.floor(number / 2)
    }
    while(!remStack.isEmpty()){
        binary += String(remStack.pop())
    }
    return binary
}


// 括号匹配
const s = "()"
const isValid = s => {
    const validBracket = {
        '(' : ')',
        '[' : ']',
        '{' : '}',
    }
    const stack = []
    
    for (let i of s) {
        if (validBracket[i]) {
            stack.push(i)
        }else{
            // i === 右括号
            let left = stack.pop()
            if (i !== validBracket[left]) {
                return false
            }
        }
    }
    return stack.length === 0
};

console.log(isValid(s));







