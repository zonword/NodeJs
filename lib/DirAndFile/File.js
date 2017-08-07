/** Private Attribute*/
const _exec = require('child_process').exec
var _execution, _executable, _fichier = null 

/** Public Methode
* [GetAccessFile] : Savoir si le fichier exist
* [GetEscape]     : Savoir si un fichier contient des espaces
* [GetFile]       : Savoir si un fichier est accessible
* [GetSize]       : Retourner la taille d'un fichier
* [Moove]         : Deplacer un fichier à partir d'un dossier source vers un dossier destination
* [SetFile]       : Ecrire du contenue dans un fichier
*/

/**
* [GetAccessFile] 
* Desc   |          | Permet de savoir si le fichier existe
* Entree | (String) | le fichier avec son chemin complet
* Sortie | (Bool)   | Retourne vrais si le fichier est bien present, sinon faux
*/
function GetAccessFile(file){
  return new Promise( (resolve,reject) => {
    fs.stat(file, (err, stats) => {
      if(err) {
        if (err.code == "ENOENT") { reject(`Le fichier n'est plus present`) } 
      } else { resolve(true) }
    })
  })
}
/**
* [GetEscape] 
* Desc   |          | Permet de savoir si un fichier contient des espaces
* Entree | (String) | Un fichier
* Sortie | (Bool)   | retourne vrais si le fichier contient des espaces, sinon faux
*/
function GetEscape(file){
  return new Promise( (resolve,reject) => {
    if(file.indexOf(" ")) { resolve(true) } 
    else { reject(false) }
  })
}
/**
* [GetFile] 
* Desc   |                 | Permet de savoir si un fichier est accessible
* Entree | (String,String) | le chemin du repertoire ou se trouve le fichier, avec le nom du fichier, ou le fichier avec son chemin complet
* Sortie | (String)        | retourne le fichier avec son chemin complet si il est accessible en r+, sinon le code erreur
*/
function GetFile(dir, file){
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
/**
* [GetSize] 
* Desc   |          | Permet de retourner la taille d'un fichier
* Entree | (String) | Un fichier
* Sortie | (String) | retourne la taille du fichier, sinon erreur
*/
function GetSize(file){
  return new Promise( (resolve,reject) => {
    fs.stat(file, (err, stats) => {
      if(err) { reject(err) } else {
        resolve(stats["size"])
      }
    })
  })
}
/**
* [Moove] 
* Desc   |                 | Permet de deplacer un fichier à partir d'un dossier source vers un dossier destination
* Entree | (String,String) | le chemin du repertoire ou se trouve le fichier, avec le chemin du repertoire ou le fichier doit se retrouver
* Sortie | (String)        | retourner les donnée du fichier qui est déplacé
*/
function Moove(source,destination){
  return new Promise( (resolve,reject) => {
    _execution  = `move /Y ${source} ${destination}`
    _executable = _exec(_execution, ["bash"])
    
    _executable.stdout.on('data', (data) => { console.log(data) })
    _executable.stderr.on('data', (data) => { reject(data) })
    _executable.on('exit', (data) => { resolve(data) })
  })
}
/**
* [SetFile] 
* Desc   |                  | Ecrire du contenue dans un fichier
* Entree | (String, String) | Un fichier, et le contenue
* Sortie | (Bool)           | retourne vrais si le contenue à pus être ecris sinon retourne une erreur
*/
function SetFile(file,content){
  return new Promise( (resolve,reject) => {
    fs.writeFile(file, content, (err) => {
      if(err) { reject(err) }
      else { resolve(true) }
    })
  })
}

module.exports.GetAccessFile  = GetAccessFile
module.exports.GetEscape      = GetEscape
module.exports.GetFile        = GetFile
module.exports.GetSize        = GetSize
module.exports.Moove          = Moove
module.exports.SetFile        = SetFile
