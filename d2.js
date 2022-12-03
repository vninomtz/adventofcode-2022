fs = require('fs');
const data = fs.readFileSync('d2-input.txt', 'utf8').split("\n")

const play = {
  A: 1, // rock
  B: 2, // paper
  C: 3  // scissors
}
const playB = {
  X: 1, // rock
  Y: 2, // paper
  Z: 3  // scissors
}
const outcome = {
  lost: 0,
  draw: 3,
  win: 6
}
const strategy = {
  X: outcome.lost,
  Y: outcome.draw,
  Z: outcome.win
}


const test = [
  "A Y",
  "B X",
  "C Z"
]

const checkResult = (p1, p2) => {
  if (play[p1] === playB[p2]) {
    return outcome.draw
  }
  if (p1 === "A" && p2 === "Y") {
    return outcome.win
  }
  if (p1 === "B" && p2 === "Z") {
    return outcome.win
  }
  if (p1 === "C" && p2 === "X") {
    return outcome.win
  }

  return outcome.lost
}
const calcPlay = (p1, exp) => {
  if (strategy[exp] === outcome.draw) {
    return p1
  }

  if (strategy[exp] === outcome.lost) {
    if (p1 === "A") {
      return  "C"
    }
    if (p1 === "B") {
      return "A"
    }
    if (p1 === "C") {
      return "B"
    }
  }

  if (strategy[exp] === outcome.win) {
    if (p1 === "A") {
      return  "B"
    }
    if (p1 === "B") {
      return "C"
    }
    if (p1 === "C") {
      return "A"
    }
  }

}

let result = 0

result = data.reduce((acum, curr) => {
  if (curr === "") {
    return acum
  }
  const p1 = curr[0]
  const p2 = curr[2]

  const rmatch = checkResult(p1, p2)
  const total = playB[p2] + rmatch
  acum += total
  return acum
}, 0)


let sResult = 0
sResult = data.reduce((acum, curr) => {
  if (curr === "") {
    return acum
  }
  const p1 = curr[0]
  const p2 = curr[2]

  const p = calcPlay(p1, p2)
  // console.log(p)
  const total = play[p] + strategy[p2]
  acum += total
  return acum
}, 0)

console.log(sResult)
