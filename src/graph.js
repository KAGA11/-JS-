// 邻接表

export default class Graph {
    // 是否有向
    constructor(isDirected = false){
        this.isDirected = isDirected
        this.vertices = []
        this.adjList = new Map()
    }
    addVertex(v){
        if (!this.vertices.includes(v)) {
            this.vertices.push(v)
            this.adjList.set(v,[]) // 初始化邻接表
        }
    }

    // 如果v w 不存在图中 先创建这两个顶点
    addEdge(v,w){
        if (!this.adjList.get(v)) {
            this.addVertex(v)
        }

        if (!this.adjList.get(w)) {
            this.addVertex(w)
        }

        // 注意无向图是双向的
        this.adjList.get(v).push(w)
        if (!this.isDirected) {
            this.adjList.get(w).push(v)
        }

    }

    getVertices(){
        return this.vertices
    }

    getEdges(){
        return this.adjList
    }

    showEdge() {
        let s = '';
        for (let i = 0; i < this.vertices.length; i++) {
          s += `${this.vertices[i]} -> `;
          const neighbors = this.adjList.get(this.vertices[i]);
          for (let j = 0; j < neighbors.length; j++) {
            s += `${neighbors[j]} `;
          }
          s += '\n';
        }
        return s;
      }
}

// 实例
const graph = new Graph()
const verticesList = ['A','B','C','D','E','F','G','H']
for (const v of verticesList) {
    graph.addVertex(v)
}
graph.addEdge('A','B')
graph.addEdge('A','C')
graph.addEdge('A','D')
graph.addEdge('D','B')
graph.addEdge('H','G')
graph.addEdge('F','D')
graph.addEdge('E','G')
graph.addEdge('C','E')


console.log(graph.showEdge())
