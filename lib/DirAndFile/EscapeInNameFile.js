function Main(file){
  return new Promise( (resolve,reject) => {
    if(file.indexOf(" ")) { resolve(true) } 
    else { reject(false) }
  })
}

module.exports.Get = Main
