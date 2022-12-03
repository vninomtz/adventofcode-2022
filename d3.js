fs = require('fs');
const data = fs.readFileSync('d3-input.txt', 'utf8').split("\n")


const test = [
  "vJrwpWtwJgWrhcsFMMfFFhFp",
  "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
  "PmmdzqPrVvPwwTWBwg",
  "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
  "ttgJtRGJQctTZtZT",
  "CrZsJsPPZsGzwwsLwLmpwMDw"
]

const findPriorityItem = (str) => {
  const mid = str.length / 2

  const first = str.slice(0, mid)
  const second = str.slice(mid)

  const dic = {}
  for (let i = 0; i < first.length; i++) {
    if (!(first[i] in dic)) {
      dic[first[i]] = 0
    }
    dic[first[i]] += 1
  }
  for (const x of second) {
    if (x in dic) {
      return x
    }
  }
  return ""
}

const findPriorityItemByArr = (arr) => {
  const [first, second, third] = arr
  const dic = {}
  const dic2 = {}
  for (let i = 0; i < first.length; i++) {
    if (!(first[i] in dic)) {
      dic[first[i]] = 0
    }
    dic[first[i]] += 1
  }
  for (let i = 0; i < second.length; i++) {
    if (!(second[i] in dic2)) {
      dic2[second[i]] = 0
    }
    dic2[second[i]] += 1
  }
  for (const x of third) {
    if (x in dic && x in dic2) {
      return x
    }
  }
  return ""
}

const isUpper = (letter) => {
  return letter === letter.toUpperCase()
}

const calcPriority = (letter) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const upper = isUpper(letter)
  const index = alphabet.indexOf(letter.toLowerCase()) + 1
  return  upper ? index + alphabet.length : index
}

const groupItems = (items) => {
  const groups = []
  let group = []
  for (const item of items) {
    if (group.length === 3) {
      groups.push(group)
      group = []
    }
    if (item !== "") {
      group.push(item)
    }
  }
  if(group.length > 0){
    groups.push(group)
  }
  return groups
}

const result = groupItems(data).reduce((acc, curr) => {
  const item = findPriorityItemByArr(curr)
  const priority = calcPriority(item)
  acc += priority
  return acc
}, 0)

console.log(result)
