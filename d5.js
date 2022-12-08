fs = require('fs');
const data = fs.readFileSync('d5-input.txt', 'utf8').split("\n")


let testStacks = [
  'ZN',
  'MCD',
  'P'
]
const testMoves = [
  "move 1 from 2 to 1",
  "move 3 from 1 to 3",
  "move 2 from 2 to 1",
  "move 1 from 1 to 2"
]

let stacks = [
  'BGSC',
  'TMWHJNVG',
  'MQS',
  'BSLTWNM',
  'JZFTVGWP',
  'CTBGQHS',
  'TJPBW',
  'GDCZFTQM',
  'NSHBPF'
]

const movesData = data.slice(10)

testStacks = testStacks.map(str => {
  return str.split("")
})
stacks = stacks.map(str => {
  return str.split("")
})

const parseStr = (move) => {
  const args = move.split(" ")
  return {
    move: parseInt(args[1]),
    from: parseInt(args[3]),
    to: parseInt(args[5]),
  }
}


const reorder = (arr, moves) => {
  moves.forEach(str => {
    if (str !== "") {
      const move = parseStr(str)
      for (let i = 0; i < move.move; i++) {
        const last = arr[move.from - 1].pop()
        arr[move.to - 1].push(last)
      }
    }
  })
}

const reorderMultiple = (arr, moves) => {
  moves.forEach(str => {
    if (str !== "") {
      const move = parseStr(str)
      const tmp = []
      for (let i = 0; i < move.move; i++) {
        const last = arr[move.from - 1].pop()
        tmp.push(last)
      }
      tmp.reverse().forEach(val => {
        arr[move.to - 1].push(val)
      })
    }
  })
}

const topValues = (arr) => {
  return arr.reduce((acc, stack) => {
    const last = stack[stack.length - 1]
    return `${acc}${last}`
  }, "")
}

//part one
//reorder(stacks, movesData)
//const result = topValues(stacks)

//part  two
// reorderMultiple(testStacks, testMoves)
// const result = topValues(testStacks)

reorderMultiple(stacks, movesData)
const result = topValues(stacks)

console.log(result)
