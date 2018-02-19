var commandesansdoublon = [];
var requete             = "";

/**
* trim() retourne une chaine de caractère sans espace
* @param <String> sString
* @return <String> sString
*/
function trim(sString) {
    while (sString.substring(0,1) == ' ' || sString.substring(0,1) == '\t' ||
      sString.substring(0,1) == '\r' || sString.substring(0,1) == '\n')
    {
        sString = sString.substring(1, sString.length)
    }
    while (sString.substring(sString.length-1, sString.length) == ' ' ||
      sString.substring(sString.length-1, sString.length) == '\t' ||
      sString.substring(sString.length-1, sString.length) == '\r' ||
      sString.substring(sString.length-1, sString.length) == '\n')
    {
        sString = sString.substring(0,sString.length-1)
    }
    return sString
}

/**
* verifielaligne() retourne vrais si
* les quatres première colonnes d'une ligne du tableau sont des decimaux
* sinon faux
* @param <Array> tableau, <Int> ligne,
* @return <Bool>
*/
function verifielaligne(tableau,ligne){
  var mag = tableau[ligne][0]
  var cmd = tableau[ligne][1]
  var art = tableau[ligne][2]
  var qte = tableau[ligne][3]
  var regle = new RegExp('\\D')
  if (regle.test(mag) != true && regle.test(cmd) != true && regle.test(art) != true && regle.test(qte) != true) {
    if (mag != null && cmd != null && art != null && qte != null) {
      if (mag != undefined && cmd != undefined && art != undefined && qte != undefined) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } else {
    return false
  }
}
/**
* getmagasin() retourne le numero du magasin
* @param <Array> feuille
* @return <Int> mag
*/
function getmagasin(feuille){
	return feuille[4][0];
  /*var i   = 0
  var len = feuille.length
  for(; i < len; ){
    if(verifielaligne(feuille,i)){
      var mag     = feuille[i][0]
      var j       = i++
      if (verifielaligne(feuille,j)){
        var nextmag = feuille[j][0]
        if (mag == nextmag){
          return mag
        }
        else {
          i++;
        }
      }
      else {
        i++;
      }
    }
    else {
      i++;
    }
  }*/
}
/**
* verifiesinonpresentdanscommandesansdoublon() retourne faux
* si la commande est present dans la commande doublon
* sinon vrais
* @param <Int> commande
* @return <Bool>
*/
function verifiesinonpresentdanscommandesansdoublon(commande){
  for(var i = 0; i < commandesansdoublon.length; i++){
    if (commande == commandesansdoublon[i]) return false
  }
  return true
}
/**
* SupprimerDoublonCommande()
* recupère tout les commandes dans les doublons
* @param <Array> feuille
*/
function SupprimerDoublonCommande(feuille){
  commandesansdoublon = [];
  for(var i = 0; i < feuille.length; i++){
    var cmd              = feuille[i][1]
    var checkligne       = verifielaligne(feuille,i)
    var checksansdoublon = verifiesinonpresentdanscommandesansdoublon(cmd)
    if( checkligne && checksansdoublon){
      commandesansdoublon.push(cmd)
    }
  }
}

/**
* RequeteCommandeAZero()
* Ecris la requete qui passe les quantités des commandes à 0
* sauf celle qui ne sont pas comprise entre les situations 4 et 8
* et on change la situation a 8 si elles sont en situation 4
* @param <Int> magasin, <Int> commande,
* @return <String> requete
*/
function RequeteCommandeAZero(magasin,commande){
  var magasin 	= trim(String(magasin))
  var commande 	= trim(String(commande))
	var requete 	= ""
	requete       = `update CONFIDENTIEL where CONFIDENTIEL = ${magasin} and CONFIDENTIEL = ${commande} CONFIDENTIEL;\r\n`
	requete      += `update CONFIDENTIEL where CONFIDENTIEL = ${magasin} and CONFIDENTIEL = ${commande} CONFIDENTIEL;\r\n`
	return requete;
}
/**
* RequeteBonneQuantite()
* Ecris la requete avec les bonne quantitées
* sauf celle qui ne sont pas comprise entre les situations 4 et 8
* @param <Array> tableau
* @return <String>
*/
function RequeteBonneQuantite(tableau){
  var magasin 	= trim(String(tableau[0]))
	var commande 	= trim(String(tableau[1]))
	var article 	= trim(String(tableau[2]))
	var quantite 	= trim(String(tableau[3]))
	return `update CONFIDENTIEL set CONFIDENTIEL = ${quantite} , CONFIDENTIEL = ${quantite} , CONFIDENTIEL = ${quantite}*CONFIDENTIEL , CONFIDENTIEL = ${quantite}*CONFIDENTIEL where CONFIDENTIEL = ${magasin} and CONFIDENTIEL = ${commande} and CONFIDENTIEL = ${article} and CONFIDENTIEL;`
}
/**
* InitialiserQuantiteeDesCommandesSansDoublon()
* Concatène tout les requetes des commandes à 0
* @param <Array> feuille, <Array> commandes
* @return <String> requete
*/
function InitialiserQuantiteeDesCommandesSansDoublon(feuille,commandes){
  var requete = "";
  var mag     = getmagasin(feuille);
  for(var i = 0; i < commandes.length; i++){
    requete += RequeteCommandeAZero(mag,commandes[i]);
  }
  return requete;
}
/**
* InitialiserLesBonneQuantitee()
* Concatène tout les requetes des commandes avec les bonne quantité
* @param <Array> feuille
* @return <String> requete
*/
function InitialiserLesBonneQuantitee(feuille){
  var requete = "";
  for(var i = 0; i < feuille.length ; i++){
    if(verifielaligne(feuille,i)){
      requete += `${RequeteBonneQuantite(feuille[i])}\r\n`
    }
  }
  return requete
}

/**
* ControleQte()
* Compte tout les quantitées commandés
* @param <Array> feuille, <Array> commandesansdoublon
* @return <Int> qte
*/
function ControleQte(tableau,commandesansdoublon){
  var qte = 0
  for(var i = 0; i < tableau.length; i++){
    var checkligne = verifielaligne(tableau,i)
    if (checkligne) {
      qte += tableau[i][3]
    }
  }
  return qte
}
/**
* ControleRequete()
* Retourne la requete qui va faire la somme de tout les quantités de tout les commandes
* @param <Array> commandesansdoublon
* @return <String> requete
*/
function ControleRequete(commandesansdoublon){
  var commandes = commandesansdoublon.join();
  return `count CONFIDENTIEL from mgdcf where CONFIDENTIEL > 0 and CONFIDENTIEL in (${commandes})`;
}

/**
* main()
* Retourne la requete, avec tout les quantité commandé, et la requete de controle
* @param <Array> feuille,
* @return <Json>
*/
function main(feuille,fichier){
  SupprimerDoublonCommande(feuille)
  requete = "SPOOL "+fichier+".log\r\n"
  requete += InitialiserQuantiteeDesCommandesSansDoublon(feuille,commandesansdoublon)
  requete += InitialiserLesBonneQuantitee(feuille)
  requete += "SPOOL OFF\r\n"
  //requete += "Rollback;";
  requete += "commit;\r\nexit;"
  var qtecommander      = ControleQte(feuille,commandesansdoublon)
  var requetedecontrole = ControleRequete(commandesansdoublon)
  return {
    requete,
    qtecommander,
    requetedecontrole
  }
}

module.exports.Execute       = main;
module.exports.GetMagasin    = getmagasin;
