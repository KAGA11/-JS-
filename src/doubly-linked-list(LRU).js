// 利用双向链表实现LRU缓存
// LRU 用于前端性能优化 通过保留最近使用的项并丢弃最久未使用的项来管理有限的缓存空间

class Node {
    constructor(key=0,value = 0){
        this.key = key
        this.value = value
        this.prev = null
        this.next = null
    }
}

// 可以把LRUCache当作一个书架 里面每一个node是一本书,
// get 把一本书放在最上面
// put 如果有这本书 替换这本书的value 然后放到最上面
//     如果没有这本书 加一本放在最上面
//        如果超过了capacity 那么就删除最下面那本书


class LRUCache{
    constructor(capacity){
        this.capacity = capacity
        // dummy 节点
        this.dummy = new Node()
        this.dummy.prev = this.dummy
        this.dummy.next = this.dummy
        this.keyToNode = new Map()
    }


    getNode(key){
        // 找不到
        if (!this.keyToNode.has(key)) return null
        // 找到了
        const node = this.keyToNode.get(key)
        // 把一本书放在最上面
        this.remove(node)
        this.pushFront(node)
        return node
    }

    get(key){
        const node = this.getNode(key)
        return node ? node.value : -1
    }

    put(key,value){
        // 如果有这本书 替换这本书的value 然后放到最上面
        let node = this.getNode(key)
        if (node) {
            node.value = value
            return;
        }
        //  如果没有这本书 加一本放在最上面
        node = new Node(key,value)
        this.keyToNode.set(key, node);
        this.pushFront(node)
        if (this.keyToNode.size > this.capacity) {
            let backNode = this.dummy.prev
            this.keyToNode.delete(backNode.key)
            this.remove(backNode)
        }
    }

    remove(node){
        node.prev.next = node.next
        node.next.prev = node.prev
    }

    pushFront(node){
        node.prev = this.dummy
        node.next = this.dummy.next
        node.prev.next = node
        node.next.prev = node
    }
}