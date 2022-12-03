fs = require('fs');
const data = fs.readFileSync('d1-input.txt', 'utf8');

const test = ['2', '2', '3', '', '3', '10', '', '5']
const cal = data.split("\n")


const res = []

let tmp = []
for (const val of cal) {
  if(val === "") {
    const sum = tmp.reduce((acc, curr) => {
      return acc + curr
    }, 0)
    res.push(sum)
    tmp = []
  }else {
    tmp.push(parseInt(val))
  }
}

if (tmp.length > 0) {
  const sum = tmp.reduce((acc, curr) => {
    return acc + curr
  }, 0)
  res.push(sum)
}

res.sort((a,b) => b-a)
console.log(res[0] + res[1] + res[2])
