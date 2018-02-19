function Trim(sString) {
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
function Verifielaligne(tableau,ligne){
    var mags = [780, 781, 782, 783, 810, 814, 817, 820, 829, 838, 868, 875, 889, 895, 899];
    var mag = parseInt(tableau[ligne][0]);
    var cmd = parseInt(tableau[ligne][1]);
    var art = parseInt(tableau[ligne][2]);
    var qte = parseInt(tableau[ligne][3]);
    var regle = new RegExp('\\D');
    if (regle.test(mag) != true && regle.test(cmd) != true && regle.test(art) != true && regle.test(qte) != true) {
      if (mag != null && ( mags.indexOf(mag) != -1 ) && cmd != null && art != null && qte != null) {
        if (mag != undefined && cmd != undefined && art != undefined && qte != undefined) { return true; } 
        else { return false; }
      } else { return false; }
    } else { return false; }
}

module.exports.Trim           = Trim
module.exports.Verifielaligne = Verifielaligne
