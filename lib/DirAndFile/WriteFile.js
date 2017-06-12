function Main(file,content){
  fs.writeFile(file, content, (err) => {
    if(err) { reject(err) }
    else { resolve(true) }
  })
}

module.exports.WriteFile = Main
