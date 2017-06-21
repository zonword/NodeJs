const _FileInDir = require('./FileInDir')

/** Public Attribut */

var _files    = []
var _fichier  = null

/** Private Method */

function _AddArray(file){
  return new Promise( resolve => resolve(_files.push(file)) )
}

/** Public Method */

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
        throw reject(err.code)
      } else {
        fs.close(fd, () => { resolve(_fichier) })
      }
    })
    
  })
}
/**
* [GetFiles] 
* Desc   |          | Retourne la liste complet des fichiers dans un repertoire
* Entree | (String) | le chemin du repertoire
* Sortie | (Array)  | la liste comple 
*/
function GetFiles(directory){
  return new Promise( (resolve,reject) => { 
    fs.readdir(directory, (err,dir) => {
      if(!err){
        for(var i in dir){         
          GetFile.Get(directory,dir[i])
            .then(file => {
               _AddArray(file)
                  .then(res => resolve(_files))
             })
            .catch(err => reject(err) )
        }
      }
    })
  })
}

module.exports.GetFile  = GetFile
module.exports.GetFiles = GetFiles
