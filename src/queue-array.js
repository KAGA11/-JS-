class Queue {
    constructor(){
        this.item = [];
    }
    enqueue(element){
        this.item.push(element)
    }
    dequeue(){
        return this.item.shift();
    }
    peek(){
        return this.item[0] 
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

const queue = new Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
console.log(queue);
queue.dequeue()
console.log(queue);
console.log(queue.peek());
console.log('size: ',queue.size());
queue.clear()
console.log(queue.isEmpty());


console.log('-'.repeat(30));
// 队列的实际应用
// 1 击鼓传花 参考: LCR 187 leetcode 破冰游戏 注:这道题是约瑟夫环 用queue会超时, 代码写对即可
/* 共有 names 位成员参与击鼓传花。他们围城一个圆圈,把花尽快传给旁白的人,某一时刻传花停止,这个时候花在谁手上谁就被淘汰.
   重复这个过程, 直到只剩一个成员(winner)
*/ 

/* 
  思路:
    把所有名字加入到创建的class类, 然后迭代队列,把开头加入到队尾(传递花的过程), 到count次数时队首的那个就是被淘汰的
*/ 

const names = ['Alex','Bob','Jack','Camila','John']
const count = 5
function hotPotato(names,count){
    const queue = new Queue()
    const eliminatedList = []
    for (let name of  names) {
        queue.enqueue(name)
    }
    
    while(queue.size() > 1){
        for (let i = 0; i < count; i++) {
            queue.enqueue(queue.dequeue())
        }
        eliminatedList.push(queue.dequeue())
    }

    return {
        eliminated: eliminatedList,
        winner:queue.dequeue()
    }
}

const res = hotPotato(names,count)
res.eliminated.forEach(name => {
    console.log(`${name} 被淘汰` );
})
console.log(`${res.winner} 是胜者`);
