fs              = require('fs')
gracefulFs      = require('graceful-fs')
path  			    = require('path')
const chalk     = require('chalk')
const DraftLog  = require('draftlog')

gracefulFs.gracefulify(fs)
DraftLog(console)

printrouge  = chalk.bold.red
printvert 	= chalk.bold.green
printjaune 	= chalk.bold.yellow
printbleu	  = chalk.bold.cyan
printmauve	= chalk.bold.magenta

var titre = console.draft()
var debug = console.draft()

titre(printvert(`> Titre de mon application`))
debug(printmauve(`o Debug`))
