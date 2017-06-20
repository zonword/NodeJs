const _FileInDir = require('./FileInDir')

var _files = []

function _AddArray(file){
  return new Promise( resolve => resolve(_files.push(file)) )
}

function Main(directory){
  return new Promise( (resolve,reject) => { 
    fs.readdir(directory, (err,dir) => {
      if(!err){
        for(var i = 0; i < dir.length; i++){         
          _FileInDir.Get(directory,dir[i])
            .then(file => _AddArray(file).then(res => resolve(dir[i])))
            .catch(err => { reject(err) })
        }
      }
    })
  })
}

module.exports.Get = Main
