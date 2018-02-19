const _communs = require('./Commun');

function _RequeteCommandeAZero(magasin,commande){
  var magasin 	= _communs.Trim(String(magasin));
  var commande 	= _communs.Trim(String(commande));
  var requete   = "";
	requete      += `CONFIDENTIEL;\r\n`
	requete      += `CONFIDENTIEL;\r\n`
  return requete;
}

module.exports = function(feuille,commandes){
  var requete = "";
  var mag     = feuille[4][0];
  for(var i in commandes) {
    requete += _RequeteCommandeAZero(mag,commandes[i]);
  }
  return new Promise( resolve => { resolve(requete) })
}
