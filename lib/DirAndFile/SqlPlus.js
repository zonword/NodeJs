const spawn = require('child_process').spawn;
const _res  = null

function Main(magasin,file,monbat){
    return new Promise( (resolve,reject) => {
      _res = spawn('cmd.exe', ['/c', monbat, magasin, file]);

      _res.stdout.on('data', (data) => { console.log(data) })
      _res.stderr.on('data', (data) => { reject(data) })
      _res.on('exit', (code) => { resolve(data) })
    })
}

module.exports.Commit = Main;
