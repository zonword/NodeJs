const _File = require('./File')

/** Private Attribut */
var _files    = []

/** Private Method */
function _AddArray(file){
  return new Promise( resolve => resolve(_files.push(file)) )
}

/** Public Method
* [GetFiles] : Retourne la liste complet des fichiers dans un repertoire
*/

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
        if(dir[0] == null) { reject(`${directory} est vide`) } else {
          for(var i in dir){         
            _File.GetFile(directory,dir[i])
              .then(file => {
                 _AddArray(file).then(res => resolve(_files))
               }).catch(err => reject(err) )
          }
        }
      } else { reject(err) }
    })
  })
}

module.exports.GetFiles = GetFiles
