const spawn = require('child_process').spawn;

function main(data,monbat){
    var magasin           = data.magasin;
    var fichieravecchemin = data.fichieravecchemin;
    var fichierorigine    = data.fichierorigine;
    var destination       = path.join(fichieravecchemin,'..','histo'+magasin);
    res                   = spawn('cmd.exe', ['/c', monbat, magasin, fichieravecchemin, destination, fichierorigine]);
    /**
    * TODO Il faut killer res avec res.kill()
    */
}

module.exports.Commit = main;
