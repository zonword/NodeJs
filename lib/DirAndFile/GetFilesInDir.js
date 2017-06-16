const _GetFileInDir = require('./GetFileInDir')

var _file  = null 
var _files = []

function AddArray(file){
  return new Promise( resolve => resolve(_files.push(file)) )
}

function Main(directory){
  return new Promise( (resolve,reject) => { 
    fs.readdir(directory, (err,dir) => {
      if(!err){
        for(var i = 0; i < dir.length; i++){
          _file = dir[i]
          _GetFileInDir(directory,_file)
            .then(file => AddArray(file).then(res => resolve(_files)))
            .catch(err => { reject(err) })
        }
      }
    })
  })
}

module.exports.GetFilesInDir = Main
