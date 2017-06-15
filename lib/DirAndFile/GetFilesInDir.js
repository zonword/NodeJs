const _GetFileInDir = require('./GetFileInDir')

var _dir, _file = null 
const _files    = []

function Main(directory){
  return new Promise( (resolve,reject) => { 
    fs.readdir(directory, (err,dir) => {
      if(!err){
        for(var i = 0; i < dir.length; i++){
          _file = dir[i]
          _GetFileInDir(directory,_file)
            .then(file => { _files.push(_file) })
            .catch(err => { reject(err) })
        }
        resolve(_files)
      }
    })
  })
}
