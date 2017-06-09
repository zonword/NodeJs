var _dir 	= null
var _file 	= null 

function searchfiles(directory){
  _dir = fs.readdirSync(directory)
  
  for(var i = 0; i<_dir.length; i++){
    _file          = _dir[i]
    existfile     = existsSync(path.join(directory,file))
    existescape   = existsEscapeSync(file)
    taillefichier = filesizeSync(path.join(directory,file))
    if(existfile && taillefichier < 10000000 && !existescape){
      var extension             = path.extname(file)
      var deuxpremiercaractere  = String(file).substr(0,2)
      var file                  = path.join(directory,file)
      var existfile             = checkfile(filesofdir[i])
      if(deuxpremiercaractere != "~$" && (extension == ".xlsx" || extension == ".csv") && existfile){
        try{
          var fd = fs.openSync(file, 'r+')
          fs.closeSync(fd)
          main(false)
          files.push(new QueueWorker(filesofdir[i],file))
          metier()
        }catch(err){
          if (err.code == "EBUSY") debug(printmauve("un fichier EBUSY"))
        }
      }
    } else if (taillefichier > 10000000) {
      debug(printmauve(`${file} est trop lourd`))
    }
  }
}
