const parse = require('csv-parse')

var csvData = []
var data    = null
var res     = []

function main(fichier){
  return new Promise( (resolve,reject) => { 
    fs.createReadStream(fichier)
      .pipe(parse({delimiter: ':' }))
      .on('data', function(csvrow) {
        csvData.push(csvrow);
      })
      .on('end', function() {
        for(var i = 0; i < csvData.length; i++){
          data = csvData[i][0].split(';');
          res.push(data);
          resolve(res);
        }
      })
  })
}

module.exports.ExtractCsv = main
