// fib 斐波那契数列
// f(n-1) + fn(n-2) = f(n)
// f(0) = 0 f(1) = 1
// 通常 迭代 比 递归快 但是对于一些算法来说迭代不可用
function ITER(n){
    if (n< 1) return 0
    if (n<= 2) return 1
    let FIB0 = 0
    let FIB1 = 1
    let FIBN = n
    for (let i = 1; i < n; i++) {
        FIBN = FIB0 + FIB1
        FIB0 = FIB1
        FIB1 = FIBN
    }
    return FIBN
}

function RECUR(n){
    // fib(5) = fib(4) + fib(3)
    // 终止条件
    if (n< 1) return 0
    if (n<= 2) return 1
    return RECUR(n - 1) + RECUR(n - 2)
}

// 记忆化 比如fib(3) 在这个递归中会多次计算 那么用一个数组吧fib(3)的结果储存下来
function RECURMEMO(n){
    let memo = new Array(n + 1).fill(undefined);
    memo[0] = 0;
    memo[1] = 1;
    const fibonacci = n => {
        if (memo[n] !== undefined) return memo[n];
        memo[n] = fibonacci(n - 1) + fibonacci(n - 2);
        return memo[n];
    }
    return fibonacci(n);
}

let n = 5
console.log(ITER(n));
console.log(RECUR(n));
console.log(RECURMEMO(n));