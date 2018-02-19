const _Supprimerdoublon  = require('./DeleteDoublons.js')
const _Initdoublon       = require('./InitDoublons.js')
const _InitQuantitee     = require('./InitQuantitee.js')
var _Commun = require('./Commun.js')

function Main(feuille,fichier) {
    return new Promise( (resolve) => { 
        _Supprimerdoublon(feuille)
            .then( commandesansdoublon => {
                var data = { cmd: commandesansdoublon, feuille: feuille };
                return data;
            }, err => console.log(err) )
            .then( res => {
                _Initdoublon(res.feuille, res.cmd)
                    .then( req => {
                        var requete    = "";
                        requete        = "SPOOL "+fichier+".log\r\n";
                        requete        += req;
                        return {feuille : res.feuille, requete: requete};
                    }, err => console.log(res) )
                    .then( data => {
                        _InitQuantitee(data.feuille)
                            .then( req2 => {
                                data.requete += req2;
                                data.requete += "commit;\r\nSPOOL OFF\r\nexit;";//requete += "Rollback;"
                                resolve(data.requete)
                            }, err => console.log(res) )
                    }, err => console.log(res) )
            }, err => console.log(res) )
    })
}

function getmagasin(feuille){
    var i   = 0
    var len = feuille.length
    for(; i < len; ){
        if(_Commun.Verifielaligne(feuille,i)){
            var mag     = feuille[i][0]
            var j       = i++
            if (_Commun.Verifielaligne(feuille,j)){
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

module.exports.Main = Main;
module.exports.GetMagasin = getmagasin;
