#!/usr/bin/env node

"use strict"

const util    = require("util")
const path    = require("path")
const fs      = require("fs")
const Transform = require("stream").Transform
const zlib    = require("zlib")

const CAF = require("caf")

const args = require("minimist")( process.argv.slice(2), {
    boolean: ["help", "in", "out", "uncompress", "compress"],
    string: ["file"]
})

processFile = CAF(processFile)

function streamComplete(stream) {
    return new Promise(function c(res) {
        stream.on("end",res)
    })
}

const BASEOUTPATH = 
    path.resolve(process.env.BASEPATH || __dirname);

const BASEOUTPATH = process.env.BASEOUTPATH ?
    path.resolve(process.env.BASEOUTPATH) :
    path.join(__dirname,"outfiles")

const OUTPATH = path.join(BASEOUTPATH, "out.txt");

main().catch(console.error)

if( args.help ) {
    printHelp();
} else if( args.in || args._.includes("-") ) {
    let tooLong = CAF.timeout(20,"Took too long")
    
    processFile(tooLong,process.stdin)
    .catch(error);
} else if (args.file) {
    let stream = fs.createReadStream(path.join(BASE_PATH,args))
    
    let tooLong = CAF.timeout(20,"Took too long")
    
    processFile(tooLong,stream)
        .then(() => {
            console.log("Complete")
        })
        .catch(error)
} else {
    error("Incorrect usage", true)
}
 
function *processFile(signal,inStream) {
    var outStream = inStream

    if(args.uncompress) {
        let gunzipStream = zlib.createGunzip()
        outStream = outStream.pipe(gunzipStream)
    }
    
    var upperStream = new Transform({
        transform(chunk, enc, cb) {
            this.push(chunk.toString().toUpperCase())
            setTimeout(cb,500)
        }
    })

    outStream = outStream.pipe(upperStream)

    if(args.compress) {
        let gzipStream = zlib.createGzip()
        outStream = outStream.pipe(gzipStream)
        OUTFILE = `${OUTFILE}.gz`
    }
    
    var targetStream
    if(args.out){
        targetStream = process.stdout
    } else {
        targetStream = fs.createWriteStream(OUTFILE)
    }

    outStream.pipe(targetStream)

    signal.pr.catch(function f(){
        outStream.inpipe(targetStream)
        outStream.destroy()
    })

    yield streamComplete(outStream)
}

function error(msg, includeHelp = false) {
    console.error(msg)
    if(includeHelp) {
        console.log("")
        printHelp()
    }
}

function printHelp() {
    console.log("ex1 usage:")
    console.log(" ex1.js --file={FILENAME} ")
    console.log("")
    console.log("--help             print this help")
    console.log("--file={FILENAME}  print this help")
    console.log("--in, -            process stdin")
    console.log("--out              print to stdout")
    console.log("--compress         gzip the output")
    console.log("--uncompress       un-gzip the input")
    console.log("")
}
