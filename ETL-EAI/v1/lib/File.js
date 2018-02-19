const exec = require('child_process').exec;
const fs   = require('fs');

function main(data){
  var fichieravecchemin  = data.fichieravecchemin;
  var contenue           = data.contenue;

  fs.writeFileSync(fichieravecchemin, contenue);
}

function moove(source,destination){
  var execution         = `move /y ${source} ${destination}`
  var executable        = exec(execution, ["bash"])
  executable.stdout.on('data', function(data){
    stdout(`o Sortie > ${printjaune(data)}`)
  })
  executable.stderr.on('data', function(data){
    stderr(`o Erreur > ${printrouge(data)}`)
  })
  executable.on('exit', function(code){ 
    exit(`o Quitte > ${printjaune(code)}`)
  })
}

module.exports.Ecrire = main;
module.exports.Moove  = moove;
