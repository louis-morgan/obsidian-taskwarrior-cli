const readline = require('readline');

const getData = async () => {
  return new Promise((resolve, reject) => {
    const lines = [];
    const rl = readline.createInterface({
      input: process.stdin,
    })
  
    rl.on('line', (line) => {
      lines.push(line);
    })
    
    rl.on('close', () => {
      resolve(lines)
    })

    rl.on('error', (line) => {
      reject(err)
    })
  })
}

module.exports = getData