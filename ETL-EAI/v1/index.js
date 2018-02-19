const fs          = require('fs')
const gracefulFs  = require('graceful-fs')
const path  			= require('path')
const chalk		    = require('chalk')
const QueueWorker = require('./lib/ClassQueueWorker')
const xlsx      	= require('./lib/ExtractXlsx')
const csv      	  = require('./lib/ExtractCsv')
const platform  	= require('./lib/Platform')
const file      	= require('./lib/File')
const sqlplus   	= require('./lib/SqlPlus')
const DraftLog    = require('draftlog')
DraftLog(console)
gracefulFs.gracefulify(fs)

printrouge  = chalk.bold.red
printvert 	= chalk.bold.green
printjaune 	= chalk.bold.yellow
printbleu	  = chalk.bold.cyan
printmauve	= chalk.bold.magenta
var titre = console.draft()
stdout    = console.draft()
stderr    = console.draft()
exit      = console.draft()
var debug = console.draft()

titre(printvert(`> Trigger File: .xlsx && .csv`))
stdout(`o Sortie > `)
stderr(`o Erreur > `)
exit(`o Quitte > `)
debug(printmauve(`o Debug`))

var files     = []
const dir     = path.join(__dirname,'platform')
var interval  = null
var timeout   = null

function existsEscapeSync(file){
  var res = file.indexOf(" ")
  if( res == -1) {
    return false
  } else {
    return true
  }
}
function existsSync(filepath){
  try{
    fs.statSync(filepath)
  }
  catch(err){
    if (err.code == "ENOENT") return false
  }
  return true
}
function filesizeSync(filepath){
  var stats
  var size
  var i
  try{
    stats = fs.statSync(filepath)
    size  = stats["size"]
    //i     = Math.floor( Math.log(size) / Math.log(1024) );
    //return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i]
    return size
  }catch(err){
    return false
  }
}
function AffichageTitre(){
  timeout = setTimeout(function() {
    titre(printvert(`\\ Trigger File: .xlsx && .csv`))
    timeout = setTimeout(function() {
      titre(printvert(`| Trigger File: .xlsx && .csv`))
      timeout = setTimeout(function() {
        titre(printvert(`/ Trigger File: .xlsx && .csv`))
        timeout = setTimeout(function() {
          titre(printvert(`- Trigger File: .xlsx && .csv`))
        }, 1000)
      }, 1000)
    }, 1000)
  }, 1000)
}
function checkWorking(){
  var res = null
  for(var i = 0; i < files.length; i++){
    res = files[i].GetWorking()
    if (res) {
      return true
    }
  }
  return false
}
function checkfile(nom){
  var res
  for(var i = 0; i < files.length; i++){
    res = files[i].name
    if (res == nom) return false
  }
  return true
}

function metierafficher(){
  for(var i = 0 ; i < files.length; i++ ){
    files[i].Affichage()
  }
}
function codemetier(i){
  var metierTimeout = null
  var cheminfichier = null
  var extension     = null
  var nomfichier    = null
  var existfile     = null
  var work          = null
  var monfichiersql = null
  var fichiersql    = null
  var monbat        = null
  var feuille       = null
  var resplatform   = null
  var requete       = null
  var ecriture      = null
  var data          = null
  var workfile      = null
  var historiser    = null
  var arraycsv      = []
  if(!files.length) {
    return;
  } else {
    cheminfichier = files[i].GetFile()
    extension     = path.extname(cheminfichier)
    nomfichier    = files[i].GetName()
    existfile     = existsSync(cheminfichier)
    work          = checkWorking()
    if(files.length && existfile && !work){
      files[i].SetWorking(true)
      monfichiersql = nomfichier+"-"+new Date().getTime()+".sql"
      fichiersql    = path.join(cheminfichier,'..','..',monfichiersql)
      monbat        = path.join(cheminfichier,'..','..','execute.bat')
      if (extension == '.xlsx') {
        feuille       = xlsx.ExtractXlsx(`${cheminfichier}`)
        resplatform   = platform.Execute(feuille,fichiersql)
        requete       = resplatform.requete
        ecriture      = {
          fichieravecchemin : fichiersql,
          contenue          : requete
        }
        data          = {
          magasin           : platform.GetMagasin(feuille),
          fichieravecchemin : ecriture.fichieravecchemin
        }
        workfile    = path.join(__dirname,"platform",nomfichier)
        historiser  = path.join(__dirname,"histo"+data.magasin,nomfichier)
        file.Moove(cheminfichier, "histo"+data.magasin)
        metierTimeout   = setTimeout(function(){
          if(existsSync(historiser) && !existsSync(workfile)){
            file.Ecrire(ecriture)
            sqlplus.Commit(data,monbat);
            files[i].Finish()
            files.shift()

            metierTimeout = setTimeout(function(){
              codemetier(i)
            },1500)

          } else {
            return ;
          }
        }, 500)
      }
      if (extension == '.csv') {
		  csv.ExtractCsv(`${cheminfichier}`, function(feuille){
			  resplatform   = platform.Execute(feuille,fichiersql)
			  requete       = resplatform.requete
			  ecriture      = {
				fichieravecchemin : fichiersql,
				contenue          : requete
			  }
			  data          = {
				magasin           : platform.GetMagasin(feuille),
				fichieravecchemin : ecriture.fichieravecchemin
			  }
			  workfile    = path.join(__dirname,"platform",nomfichier)
			  historiser  = path.join(__dirname,"histo"+data.magasin,nomfichier)
			  file.Moove(cheminfichier, "histo"+data.magasin)
			  metierTimeout   = setTimeout(function(){
				if(existsSync(historiser) && !existsSync(workfile)){
				  file.Ecrire(ecriture)
				  sqlplus.Commit(data,monbat);
				  files[i].Finish()
				  files.shift()

				  metierTimeout = setTimeout(function(){
					codemetier(i)
				  },1500)

				} else {
				  return ;
				}
			  }, 500)
		  })
      }
    } else {
      return;
    }
  }

}

function metier(){
  metierafficher()
  setTimeout(function(){
    codemetier(0)
  }, 1000)
  main(true)
}

function searchfiles(directory){
  var file          = null
  var existfile     = null
  var existescape   = null
  var taillefichier = null
  var filesofdir    = fs.readdirSync(directory)
  for(var i = 0; i<filesofdir.length; i++){
    file          = filesofdir[i]
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

function main(flag){
  if(flag == true){
    interval = setInterval(function() {
      AffichageTitre()
      searchfiles(dir)
    }, 4000)
  }else if(flag == false){
    setTimeout(function(){
      clearTimeout(timeout)
      titre(printbleu(`> Trigger File: .xlsx && .csv`))
    },1000)
    clearInterval(interval)
  }
}
main(true)
