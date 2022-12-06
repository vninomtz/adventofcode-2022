fs = require('fs');
const data = fs.readFileSync('d4-input.txt', 'utf8').split("\n")

const test = [
  "2-4,6-8",
  "2-3,4-5",
  "5-7,7-9",
  "2-8,3-7", // true
  "6-6,4-6", // true
  "2-6,4-8",
]

const isFullyContained = (str1, str2) => {
  const s1 = [parseInt(str1[0]), parseInt(str1[1])]
  const s2 = [parseInt(str2[0]), parseInt(str2[1])]
  if (s2[0] >= s1[0] && s2[1] <= s1[1]) {
    return true
  }
  if (s1[0] >= s2[0] && s1[1] <= s2[1]) {
    return true
  }
  return false
}

const isOverlaped = (str1, str2) => {
  const s1 = [parseInt(str1[0]), parseInt(str1[1])]
  const s2 = [parseInt(str2[0]), parseInt(str2[1])]
  // 1,5 6,7
  // 6,7 1,5
  if (s1[1] < s2[0]) {
    return false
  }
  if (s1[0] > s2[1]) {
    return false
  }
  return true
}

const result = data.reduce((acc, str) => {
  if (str === '') {
    return acc
  }
  const [first, second] = str.trim().split(",")
  // const res = isFullyContained(first.split("-"), second.split("-"))
  const res = isOverlaped(first.split("-"), second.split("-"))
  return res ? acc += 1 : acc
}, 0)

console.log(result)
