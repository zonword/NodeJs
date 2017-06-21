const _FileInDir = require('./FileInDir')

/** Public Attribut */

var _files    = []

/** Private Method 
* [GetFiles] : Retourne la liste complet des fichiers dans un repertoire
*/

function _AddArray(file){
  return new Promise( resolve => resolve(_files.push(file)) )
}

/** Public Method */

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

module.exports.GetFiles = GetFiles
