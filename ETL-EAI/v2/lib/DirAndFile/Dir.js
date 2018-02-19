const _File = require('./File')
const path  = require('path')

/** Public Method
* [GetFiles] : Retourne la liste complet des fichiers dans un repertoire
*/

/**
* [GetFiles] 
* Desc   |          | Retourne la liste complet des fichiers dans un repertoire
* Entree | (String) | le chemin du repertoire
* Sortie | (Array)  | la liste comple 
* Dependance        | File.js GetFile()
*/
function GetFiles(directory){
  return new Promise( (resolve,reject) => { 
    var files = []
    fs.readdir(directory, (err,dir) => {
      if(!err){
        if(dir.length == 0) { reject(`empty`) } 
        else if(dir.length >= 1){
          for(var i in dir) {
            var file = path.join(directory,dir[i]);
            files.push(file);  
            resolve(files);
          }
        }
      } else { reject(err) }
    })
  })
}

module.exports.GetFiles = GetFiles
