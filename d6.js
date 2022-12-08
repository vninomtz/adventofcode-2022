fs = require('fs');
const buffer = fs.readFileSync('d6-input.txt', 'utf8').split("\n")[0]

const test = [
  "mjqjpqmgbljsphdztnvjfqwrcgsmlb", // 7
  "bvwbjplbgvbhsrlpgdmjqwftvncz", // 5
  "nppdvjthqldpwncqszvftbrmjlhg", // 6
  "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", // 10
  "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw" // 11
]


const existRepeted = (str) => {
  const tmp = {}
  for (const letter of str) {
    if (letter in tmp) {
      return true
    } else {
      tmp[letter] = true
    }
  }
  return false
}

const findFirstSoP = (buff) => {
  let j = 0
  for (let i = 3; i < buff.length; i++) {
    const arr = buff.slice(j, (i + 1))
    if (!existRepeted(arr)) {
      return i + 1
    } else {
      j++
    }
  }
  return -1
}

const findFirstSoM = (buff) => {
  let j = 0
  for (let i = 13; i < buff.length; i++) {
    const arr = buff.slice(j, (i + 1))
    if (!existRepeted(arr)) {
      return i + 1
    } else {
      j++
    }
  }
  return -1
}

// first part
// test.forEach(str => {
//   const res = findFirstSoP(str)
//   console.log(res)
// })

// const res = findFirstSoP(buffer)
// console.log(res)

// second part
// test.forEach(str => {
//   const res = findFirstSoM(str)
//   console.log(res)
// })

const res = findFirstSoM(buffer)
console.log(res)
