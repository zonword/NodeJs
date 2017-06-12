const _GetFileInDir = require('./GetFileInDir')

var _dir, _file = null 
const _files    = []

function Main(directory){
  return new Promise( (resolve,reject) => {
    _dir = fs.readdirSync(directory)

    for(var i = 0; i<_dir.length; i++){
      _file = _dir[i]
      _GetFileInDir(directory,_file)
        .then(file => { _files.push(file) })
        .catch(err => { reject(err) })
    }

    resolve(_files)
  })
}
