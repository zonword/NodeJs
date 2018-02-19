const fs    = require('fs');
const parse = require('csv-parse')


function main(fichier,cb){
  var csvData = []
  var data    = null
  var res     = []

  fs.createReadStream(fichier)
    .pipe(parse({delimiter: ':' }))
    .on('data', function(csvrow) {
      csvData.push(csvrow);
    })
    .on('end', function() {
      for(var i = 0; i < csvData.length; i++){
        data = csvData[i][0].split(';')
        res.push(data)
      }
      cb(res);
    })
}

module.exports.ExtractCsv = main
