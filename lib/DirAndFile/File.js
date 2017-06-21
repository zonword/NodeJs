/** Private Attribute*/
const _exec = require('child_process').exec
var _execution, _executable = null 

/** Public Methode*/

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

module.exports.GetSize = GetSize
module.exports.Moove   = Moove
