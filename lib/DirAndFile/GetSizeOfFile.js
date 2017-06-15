var _stats, _size = null

function Main(file){
  return new Promise( (resolve,reject) => {
    try {
      _stats = fs.statSync(file)
      _size  = stats["size"] 
      resolve(_size)
    } catch(err) { reject(false) }
  })
}

module.exports.GetSizeOfFile = Main
