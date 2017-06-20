function Main(file){
  return new Promise( (resolve,reject) => {
    fs.stat(file, (err, stats) => {
      if(err) { reject(err) } else {
        resolve(stats["size"])
      }
    })
  })
}

module.exports.Get = Main
