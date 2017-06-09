var _fd, _fichier = null

function Main(dir, file){
  
  if(file != null){
    _fichier = path.join(dir, file)
  }else{
    _fichier = dir
  }
  
  return new Promise( (resolve,reject) => {
    try {
      _fd = fs.openSync(_fichier, 'r+')
      fs.closeSync(_fd)
      resolve(_fichier)
    } catch(err) { 
      if (err.code == "EBUSY") {
        reject(`Non accessible, fichier utilisé par un autre processeur`)
      }
    }
  })
}

module.exports.GetFileInDir = Main
