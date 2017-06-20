var _fichier = null

function Main(dir, file){
  return new Promise( (resolve,reject) => {
    if(file != null){ _fichier = path.join(dir, file) }
    else{ _fichier = dir }
    
    fs.open(_fichier, 'r+', (err, fd) => {
      if(err) {
        if (err.code == "EBUSY") { reject(`Non accessible, fichier utilisé par un autre processus`) } 
        throw reject(err.code)
      } else {
        fs.close(fd, () => { resolve(_fichier) })
      }
    })
    
  })
}

module.exports.Get = Main
