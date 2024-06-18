// 排序
// 交换函数 用于后续排序
function swap(array,a,b){
    [array[a],array[b]] = [array[b],array[a]]
}
const arr = [1,2,3,4,2,1,3,5,7,9,4,7,1,3,6]

// 1 冒泡排序 时间复杂度最高 (写起来最简单)
// 比较相邻的两个项 如果第一个比第二个大 则交换这两个
function bubbleSort(array){
    for (let i = 0; i < array.length; i++) {
        // 基本思路
        // for (let j = 0; j < array.length - 1; j++) {
        //     if (array[j] > array[j+1]) {
        //         swap(array,j,j+1)
        //     }
        // }
        // 改进 从内循环-外循环已跑过的轮数 就可以避免内循环中所有不必要的比较 O(n**2)
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j+1]) {
                swap(array,j,j+1)
            }
        }
    }
    return array
}

// 2 选择排序  O(n**2)
// 找到最小的项放在第一位 第二小的放在第二位 
function selectionSort(array){
    for (let i = 0; i < array.length - 1; i++) {
        let indexMin = i;
        for (let j = i; j < array.length; j++) {
            if (array[indexMin] > array[j]) {
                indexMin=j
            }
        }
        if (i !== indexMin) {
            swap(array,i,indexMin)
        }
    }
    return array
}


// 插入排序
// 插入排序每次拍一个数组项 默认第一项排序了. 接着和第二项进行比较,如果第二位>第一位那么放在第一位的右边,反之交换位置,以此类推
// 数组[3,5,1,4]
/* 
   第一次:5 > 3 5在3的右边
   第二次 1 < 5 1在5的左边 1 < 3 1在3的左边
   第三次 4 < 5 4在5的左边 4 > 3 4在3的右边
*/ 

function insertionSort(array){
    // 默认第一项排序了 从1开始
    for (let i = 1; i < array.length; i++) {
        let j = i
        let temp = array[i] //保存现在的值
        while(j>0 && array[j-1] > temp){
            array[j] = array[j - 1]
            j--
        }
        // 第j小的值
        array[j] = temp
    }
    return array
}

// 归并排序 js中Array定义了sort方法来排序数组,然而这个sort的实现方式并未统一. 其中Firefox使用的就是归并,
// 而Chrome V8使用的是一个快速排序的变体.
// 归并排序是一种分而治之的算法. 其思想是将原始数组分成较小的数组,直到每个小数组只有一个位置,然后将他们归并成一个较大的数组,直到最后只有一个较大的数组
// 我们需要递归来解决问题
function mergeSort(array){
    if (array.length > 1) {
        const length = array.length
        const middle = Math.floor(length / 2)
        // 大数组化成小数组
        const left = mergeSort(array.slice(0,middle))
        const right = mergeSort(array.slice(middle,length))

        array = merge(left,right)
    }
    return array
}

function merge(left,right){
    const res = []
    let leftIndex = 0
    let rightIndex = 0
    while(leftIndex < left.length && rightIndex < right.length){
        if (left[leftIndex] < right[rightIndex]) {
            res.push(left[leftIndex])
            leftIndex++
        }else{
            res.push(right[rightIndex])
            rightIndex++
        }
    }
    return res.concat(left.slice(leftIndex).concat(right.slice(rightIndex)))
}


console.log(`bubble: ${bubbleSort(arr)}`);
console.log(`selection: ${selectionSort(arr)}`);
console.log(`insertion: ${insertionSort(arr)}`);
console.log(`merge: ${mergeSort(arr)}`);

