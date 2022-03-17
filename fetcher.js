const request = require('request');
const fs = require('fs')
const args = process.argv.slice(2);

request(args[0], (error, response, body) => {
  if(error) {
    console.log("there was an error")
    return
  }
  if(response !== 200){
    console.log("bad page")
    return
  }
  fs.writeFile(args[1], body, error => {
      if (error) {
        console.log('failed download')
        return
      }
      size = 0
      stats = fs.stat(args[1], (error, stats) => {
        size = stats.size
        console.log(`downloaded and saved to ${args[1]}, size ${size} kB`)
      })
    })
});

  // console.log("starting download")
  // fs.writeFile(args[1], data, error => {
  //   if (error) {
  //     console.log('failed download')
  //     return
  //   }
  //   console.log(`downloaded and saved to ${args[1]}`)
  // })