const spawn = require('child_process').spawn;

function main(data,monbat){
    var magasin           = data.magasin;
    var fichieravecchemin = data.fichieravecchemin;
    var fichierorigine    = data.fichierorigine;
    var destination       = path.join(fichieravecchemin,'..','histo'+magasin);
    res                   = spawn('cmd.exe', ['/c', monbat, magasin, fichieravecchemin, destination, fichierorigine]);
    
    /*res.stdout.on('data', function(data){
      stdout(`o Sortie > ${printjaune(data)}`)
    })
    res.stderr.on('data', function(data){
      stderr(`o Erreur > ${printrouge(data)}`)
    })
    res.on('exit', function(code){
      exit(`o Quitte > ${printjaune(code)}`)
    })

    /**
    * TODO Il faut killer res avec res.kill()
    */
}

module.exports.Commit = main;
