fs = require('fs');
const datainput = fs.readFileSync('d7-input.txt', 'utf8').split("\n")
const testdata = fs.readFileSync('d7-input-test.txt', 'utf8').split("\n")


class Node {
  constructor(key){
    this.key = key
    this.nParent = null
    this.nodes = []
    this.size = 0
    this.type = ""
  }
  find(key) {
    let finded = null
    this.nodes.forEach(n => {
      if (n.key === key) {
        finded = n
      }
    })
    return finded
  }
  add(node){
    node.nParent = this
    this.nodes.push(node)
  }
  getSize() {
    if (this.type === 'file') {
      return this.size
    }
    return this.nodes.reduce((acc, n) =>{
      return acc += n.getSize()
    },0)
  }
}

const TOTAL_SPACE = 70000000
const UNUSED_SPACE_REQUIRED = 30000000

const findDirs = (list, node) => {
  if (node.type === "file") {
    return
  }
  if (node.getSize() <= 100000) {
    list.push(node)
  }
  node.nodes.forEach(n => {
    findDirs(list, n)
  });
}

const findDirsForDelete = (list, node, spaceNeeded) => {
  if (node.type === "file") {
    return
  }
  if (node.getSize() >= spaceNeeded) {
    list.push(node)
  }
  node.nodes.forEach(n => {
    findDirsForDelete(list, n, spaceNeeded)
  });
}

const isCmd = (str) => {
  return str[0] === "$"
}

const execCmdCD = (fs, arg) => {
  if (arg === '/') {
    let n = fs
    while (n.nParent !== null) {
      n = n.nParent
    }
    return n
  }
  if (arg === '..') {
    let n = fs.nParent
    return n
  }
  const n = fs.find(arg)
  return n
}

const isDir = (str) => {
  return str[0] === "dir"
}

let root = new Node('/')

let data = datainput

for (let i = 0; i < data.length; i++) {
  if (data[i] === "") {
    continue
  }
  const str = data[i].split(" ")
  if (isCmd(str)) {
    if (str[1] === 'cd') {
      const n = execCmdCD(root, str[2])
      root = n
    }
    continue
  }
  if (isDir(str)) {
    const n = new Node(str[1])
    n.type = 'dir'
    root.add(n)
  }else {
    const size = parseInt(str[0]) 
    const n = new Node(str[1])
    n.type = 'file'
    n.size = size
    root.add(n)
  }
}
const dirs = []

root = execCmdCD(root, '/')
const space = UNUSED_SPACE_REQUIRED - (TOTAL_SPACE - root.getSize())
findDirsForDelete(dirs, root, space)
console.log(dirs.map(n => n.getSize()).sort((a,b) => a-b)[0])
