const _File = require('./File')

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
    var _files = []
    fs.readdir(directory, (err,dir) => {
      if(!err){
        if(dir.length == 0) { reject(`${directory} est vide`) } 
        else if(dir.length >= 1) {
          dir.map( rep => {
            _File.GetFile(directory,rep)
              .then( file => _files.push(file) )
              .catch(err => reject(err) )
          }).then( () => resolve(_files) )
        }
      } else { reject(err) }
    })
  })
}

module.exports.GetFiles = GetFiles
