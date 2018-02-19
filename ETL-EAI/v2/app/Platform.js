var commandesansdoublon = [];
var requete             = "";

function getmagasin(feuille){
  var i   = 0
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
  }
}
function verifiesinonpresentdanscommandesansdoublon(commande){
  for(var i = 0; i < commandesansdoublon.length; i++){
    if (commande == commandesansdoublon[i]) return false
  }
  return true
}
function SupprimerDoublonCommande(feuille){
  for(var i = 0; i < feuille.length; i++){
    var cmd              = feuille[i][1]
    var checkligne       = verifielaligne(feuille,i)
    var checksansdoublon = verifiesinonpresentdanscommandesansdoublon(cmd)
    if( checkligne && checksansdoublon){
      commandesansdoublon.push(cmd)
    }
  }
}
function RequeteCommandeAZero(magasin,commande){
  var magasin 	= trim(String(magasin))
  var commande 	= trim(String(commande))
	var requete 	= ""
	requete       = `update CONFIDENTIEL = ${magasin} and CONFIDENTIEL = ${commande} CONFIDENTIEL;\r\n`
	requete      += `update CONFIDENTIEL = ${magasin} and CONFIDENTIEL = ${commande} CONFIDENTIEL;\r\n`
	return requete;
}

function InitialiserQuantiteeDesCommandesSansDoublon(feuille,commandes){
  var requete = "";
  var mag     = getmagasin(feuille);
  for(var i = 0; i < commandes.length; i++){
    requete += RequeteCommandeAZero(mag,commandes[i]);
  }
  return requete;
}
function InitialiserLesBonneQuantitee(feuille){
  var requete = "";
  for(var i = 0; i < feuille.length ; i++){
    if(verifielaligne(feuille,i)){
      requete += `${RequeteBonneQuantite(feuille[i])}\r\n`
    }
  }
  return requete
}
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
function ControleRequete(commandesansdoublon){
  var commandes = commandesansdoublon.join();
  return `count dcf_qtcdee from mgdcf where dcf_qtcdee > 0 and dcf_nocdefou in (${commandes})`;
}
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
