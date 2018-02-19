const xlsx = require('node-xlsx');
const fs   = require('fs');

function main(fichier){
  var data    = xlsx.parse(fichier)
  data        = data[0]
  var feuille = data['data']
  return feuille
}

module.exports.ExtractXlsx = main
