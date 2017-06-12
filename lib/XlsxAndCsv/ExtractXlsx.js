const xlsx = require('node-xlsx')
var data, feuille

function main(fichier){
  data    = xlsx.parse(fichier)
  data    = data[0]
  feuille = data['data']
  return feuille
}

module.exports.ExtractXlsx = main
