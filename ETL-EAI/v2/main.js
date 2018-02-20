fs              = require('fs')
gracefulFs      = require('graceful-fs')
path  			= require('path')
libFile         = require('./lib/DirAndFile/File')
libDir          = require('./lib/DirAndFile/Dir')
metier          = require('./app/Metier')
const directory = path.join(__dirname,'platform');
var CheckFile   = require('./app/CheckFile')

gracefulFs.gracefulify(fs)

function _Rename(from, to) {
    return new Promise((resolve, reject) => {
        fs.rename(from, to, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
}
function _GetFiles(directory){
    return new Promise( (resolve,reject) => { 
        var dir = String(directory)
        libDir.GetFiles(dir).then(files => resolve(files), err => reject(err) )
    })
}

function Main() {
    clearTimeout(timeout);
    _GetFiles(directory)
        .then( files => {
            CheckFile.Main(files[files.length-1])
                .then( file => metier.Main(file).then( res => setTimeout(() => Main(), 5000) ), err => _Rename(fichier, fichier+'.txt') )
        }, err => setTimeout(() => Main(), 5000) )
}

var timeout = setTimeout(() => Main(), 5000);
