const _communs = require('./Commun');

function RequeteBonneQuantite(tableau){
  var magasin 	= _communs.Trim(String(tableau[0]))
	var commande 	= _communs.Trim(String(tableau[1]))
	var article 	= _communs.Trim(String(tableau[2]))
	var quantite 	= _communs.Trim(String(tableau[3]))
	return `CONFIDENTIEL ${quantite} , CONFIDENTIEL ${quantite} , CONFIDENTIEL ${quantite}*CONFIDENTIEL = ${quantite}*CONFIDENTIEL ${magasin} CONFIDENTIEL ${commande} CONFIDENTIEL ${article} CONFIDENTIEL;`
}

module.exports = function(feuille){
  var requete = "";
  for(var i in feuille) {
    if(_communs.Verifielaligne(feuille,i) == true) {
      requete += `${RequeteBonneQuantite(feuille[i])}\r\n`;
    }
  }
  return new Promise( resolve => { resolve(requete) })
}
