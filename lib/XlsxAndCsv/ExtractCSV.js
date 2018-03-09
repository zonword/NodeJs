const parse = require('csv-parse')

var csvData = []
var data    = null
var res     = []

function main(fichier){
  fs.createReadStream(fichier)
    .pipe(parse({delimiter: ':' }))
    .on('data', csvrow => csvData.push(csvrow) )
    .on('end', () => {
      for(var i = 0; i < csvData.length; i++){
        data = csvData[i][0].split(';')
        res.push(data)
      }
      return res
    })
}

module.exports.ExtractCsv = main
