const _communs = require('./Commun')

function _Verifiesinonpresentdanscommandesansdoublon(array,commande) {
    if(array.indexOf(commande) === -1) { return 'out' } else { return 'in' }
    /*for(var i in array){
        if(array[i] == commande) { return 'in' }
    }
    return 'out'*/
}

module.exports = function(feuille){
    var _commandesansdoublon = []
    for(var i in feuille) { 
        if(_communs.Verifielaligne(feuille,i) == true) {
            if(_Verifiesinonpresentdanscommandesansdoublon(_commandesansdoublon,feuille[i][1]) === 'out'){
                _commandesansdoublon.push(feuille[i][1]);
            }
        }
    }
    return new Promise( resolve => { resolve(_commandesansdoublon) })
}


