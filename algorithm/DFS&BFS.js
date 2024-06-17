// 染色表示节点状态
import Graph from '../src/graph.js'
const Colors = {
    WHITE: 0, //还没有被访问
    GREY: 1,  //访问 还没有探索
    BLACK: 2  //访问 并被完全探索
};

// 初始化所有节点为白色
const initializeColor = vertices => {
    const color = {};
    for (let i = 0; i < vertices.length; i++) {
      color[vertices[i]] = Colors.WHITE;
    }
    return color;
};

// 思路:
/* 创建一个队列queue 
   标记v为被发现的(灰色), 并将v加入queue
   如果queue非空:
        将u从queue中shift
        标注u为灰色
        将所有未访问过的(白色)加入队列 标记这些白色节点为灰色
        标注u为黑色
*/
const breadthFirstSearch = (graph,startVertex,callback) => {
    const vertices = graph.getVertices()
    const adjList = graph.getEdges()
    const color = initializeColor(vertices)

    const queue = []
    queue.unshift(startVertex)

    while(queue.length > 0){
        let u = queue.shift()
        let neighbors = adjList.get(u)
        color[u] = Colors.GREY
        for (let i = 0; i < neighbors.length; i++) {
            if (color[neighbors[i]] === Colors.WHITE) {
                color[neighbors[i]] = Colors.GREY
                queue.push(neighbors[i])
            }
        }
        color[u] = Colors.BLACK

        if (callback) {
            callback(u)
        }
    }
}

// DFS 不需要源顶点 利用递归
// 如果v未被访问 则访问v
// 标注v为被发现(灰色)
// 对于v的所有相邻未访问顶点w(白色),访问w
// 标注v为已探索
const depthFirstSearch = (graph,callback) => {
    const vertices = graph.getVertices()
    const adjList = graph.getEdges()
    const color = initializeColor(vertices)

    // 遍历每一个节点
    for (let i = 0; i < vertices.length; i++) {
        // 如果是白色
        if (color[vertices[i]]===Colors.WHITE) {
            depthFirstVisit(vertices[i],color,adjList,callback)
        }
    }

    function depthFirstVisit(v,color,adjList,callback){
        color[v] = Colors.GREY
        if (callback) {
            callback(v)
        }
        let neighbors = adjList.get(v)
        for (let i of neighbors) {
            if (color[i] === Colors.WHITE) {
                depthFirstVisit(i,color,adjList,callback)
            }
        }
        color[v] = Colors.BLACK
    }
}


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

const printVertex = value => console.log('Visited vertex: ',value);
breadthFirstSearch(graph,'A',printVertex)
console.log('*'.repeat(30));
depthFirstSearch(graph,printVertex)