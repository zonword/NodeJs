const _File = require('./File')

function GetFiles(directory){
  return new Promise( (resolve,reject) => {
    var _files = []
    fs.readdir(directory, (err,dir) => {
      if(!err){
        if(dir.length == 0) { reject(`${directory} est vide`) } 
        else if(dir.length >= 1) {
          Promise.all(dir.map( rep => {
            return _File.GetFile(directory,rep)
              .then( file => _files.push(file) )
              .catch( err => reject(err) )
          })).then(res => { resolve(_files )})
        }
      } else { reject(err) }
    })
  })
}

module.exports.GetFiles = GetFiles
