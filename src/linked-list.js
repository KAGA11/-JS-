import { defaultEquals } from '../util';
// element 和 next
import { Node } from './models/linked-list-models'; 

export default class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn;
    this.count = 0;
    this.head = undefined;
  }
  // 加入一个新节点
  // 如果是 空链表 添加第一个元素 如果不是 往后面追加
  push(element) {
    const node = new Node(element)
    let current
    if (this.head === null) {
        this.head = current
    }else{
        current = this.head
        while(current.next !== null){
            current = current.next
        }
        current.next = node
    }
    this.count++
  }
  removeAt(index) {
    if(index >= 0 && index < this.count){
        let current = this.head
        if (index === 0) {
            this.head = current.next
        }else{
            let previous
            for (let i = 0; i < index; i++) {
                previous = current
                current = current.next
            }
            // 跳过current
            previous.next = current.next
        }
        this.count--
        // 当前节点会被丢弃在内存中 等着垃圾回收器清除 不需要额外操作
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_management
        return current.element
    }
    return undefined
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head
      for (let i = 0; i < index; i++) {
        current = current.next
      }
      return current
    }
    return undefined;
  }
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element)
      if (index === 0) {
        let current = this.head
        node.next = current
        this.head = node
      }else{
        let previous = this.getElementAt(index - 1)
        let current = previous.next
        // 连下一个
        node.next = current
        // 连上一个
        previous.next = node
      }
      this.count++
      return true

    }
    return false;
  }


  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }
  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.size() && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this.count;
  }
  getHead() {
    return this.head;
  }
  clear() {
    this.head = undefined;
    this.count = 0;
  }
  toString() {
    if (this.head == null) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}