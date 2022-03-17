const request = require('request');
const fs = require('fs')
const readline = require('readline');
const args = process.argv.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(args[0], (error, response, body) => {
  if(error) {
    console.log("there was an error")
    return
  }
  if(response.statusCode !== 200){
    console.log("bad page")
    return
  }
    fs.writeFile(args[1], body, { flag: "wx" }, error => {
      if (error) {
        rl.question("file exists, overwrite?", (answer) =>{
          if(answer === 'y'){
            fs.writeFile(args[1], body, error => {
              if(error){
                console.log("failed")
              }
              size = 0
              stats = fs.stat(args[1], (error, stats) => {
              size = stats.size
              console.log(`downloaded and saved to ${args[1]}, size ${size} kB`)
              rl.close()
            })
          })
        }
        })
        return
      }
      size = 0
      stats = fs.stat(args[1], (error, stats) => {
        size = stats.size
        console.log(`downloaded and saved to ${args[1]}, size ${size} kB`)
      })
    })
});
