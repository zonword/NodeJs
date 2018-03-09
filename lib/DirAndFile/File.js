/** Private Attribute*/
const _exec = require('child_process').exec
var _execution, _executable, _fichier = null 

function GetFile(file){
  return new Promise( (resolve,reject) => {
    fs.stat(file, (err, stats) => {
      if(err) {
        if (err.code == "ENOENT") { reject(`Le fichier n'est plus present`) } else {
          reject(err)
        }
      } else { resolve(file) }
    })
  })
}

function GetReadFile(dir, file){
  return new Promise( (resolve,reject) => {
    if(file != null){ _fichier = path.join(dir, file) }
    else{ _fichier = dir }
    
    fs.open(_fichier, 'r+', (err, fd) => {
      if(err) {
        if (err.code == "EBUSY") { reject(`Non accessible, fichier utilisé par un autre processus`) } 
        if (err.code == "ENOENT") { reject(`Le fichier n'est plus present`) } 
      } else {
        fs.close(fd, () => { resolve(_fichier) })
      }
    })
    
  })
}

function Moove(source,destination){
  return new Promise( (resolve,reject) => {
    _execution  = `move /Y ${source} ${destination}`
    _executable = _exec(_execution, ["bash"])
    
    _executable.stdout.on('data', (data) => { console.log(data) })
    _executable.stderr.on('data', (data) => { reject(data) })
    _executable.on('exit', (data) => { resolve(data) })
  })
}

function GetSize(file){
  return new Promise( (resolve,reject) => {
    fs.stat(file, (err, stats) => {
      if(err) { reject(err) } else { resolve(stats["size"]) }
    })
  })
}

function GetEscape(file){
  return new Promise( (resolve,reject) => {
    if(file.indexOf(" ") != -1) { resolve(true) } 
    else { reject(false) }
  })
}

function SetFile(file,content){
  return new Promise( (resolve,reject) => {
    fs.writeFile(file, content, (err) => {
      if(err) { reject(err) }
      else { resolve(true) }
    })
  })
}

module.exports.GetReadFile = GetReadFile
module.exports.GetSize   = GetSize
module.exports.GetFile   = GetFile
module.exports.GetEscape = GetEscape
module.exports.Moove     = Moove
module.exports.SetFile   = SetFile
