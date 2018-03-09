const parse = require('csv-parse')

var csvData = []
var data    = null
var res     = []

function main(fichier){
	return new Promise( (resolve,reject) => { 
		fs.createReadStream(fichier)
			.pipe(parse({delimiter: ':' }))
			.on('data', csvrow => csvData.push(csvrow))
			.on('end', () => {
				csvData.map( csv => {
					data = csv[0].split(';');
					res.push(data);
					resolve(res);
				})
			})
	})
}

module.exports.ExtractCsv = main
