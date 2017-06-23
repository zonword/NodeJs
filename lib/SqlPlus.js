const spawn = require('child_process').spawn

function Main(data,monbat){
    var magasin           = data.magasin;
    var fichieravecchemin = data.fichieravecchemin;
    res                   = spawn('cmd.exe', ['/c', monbat, magasin, fichieravecchemin])
    
    res.stdout.on('data', function(data){
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

module.exports.Commit = Main
