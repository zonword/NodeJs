/*Verifie si le fichier est accessible en lecture*/
/* Entree : Un fichier avec son chemin au complet
/* Sortie : Retourne le fichier sinon le message pour laquel le fichier n'a pas les droit en r+
*/
function _GetReadFile(file){
  return new Promise( (resolve,reject) => { 
    libFile.GetReadFile(file)
      .then(fichier => resolve(fichier) )
      .catch(err => reject(err) )
  })
}
/*Verifie si le fichier contient des espaces*/
/* Entree : Un fichier avec son chemin au complet
/* Sortie : Retourne le fichier sinon le message comme quoi le fichier contient un espace
*/
function _GetEscape(file){
  return new Promise( (resolve,reject) => { 
    libFile.GetEscape(path.basename(file))
      .then(err => reject(err), res => {
        if(res == false) { resolve(file) }
      })
  })
}
/*Verifie la taille du fichier*/
/* Entree : Un fichier avec son chemin au complet
/* Sortie : Retourne la taille d'un fichier
*/
function _GetSize(file){
  return new Promise( (resolve,reject) => {    
    libFile.GetSize(file)
      .then(taille => resolve(file) )
      .catch(err => reject(err) )
  })
}
/*Verifie l'extensions*/
/* Entree : Un fichier avec son chemin au complet
/* Sortie : Retourne la taille d'un fichier
*/
function _CheckExtension(file){
  return new Promise( (resolve,reject) => { 
    var extension             = path.extname(file)                /*Recupère l'extensions*/
    var deuxpremiercaractere  = String(file).substr(0,2)          /*Verifie si ce n'est pas un fichier temporaire*/
    if( deuxpremiercaractere != "~$" && (extension == ".xlsx" || extension == ".csv")){ resolve(true) } 
    else { reject(`${file} n'a pas le bon extension`) }
  })
}

function Main(file){
  return new Promise( (resolve,reject) => {
    _GetReadFile(file)
      .then( fichier => {
        _GetEscape(fichier)
          .then( file => {
            _GetSize(file)
              .then( fichier => resolve(fichier), err => reject(`_GetSize ${err}`) )
          }, err => reject(`_GetEscape ${err}`) )
      }, err => reject(`_GetReadFile ${err}`) )
  })
}

module.exports.Main = Main
