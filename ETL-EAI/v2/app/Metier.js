const xlsx      = require('../lib/XlsxAndCsv/ExtractXlsx')
const csv      	= require('../lib/XlsxAndCsv/ExtractCSV')
const platform  = require('./Platform/main')
const sqlplus   = require('../lib/SqlPlus')

function Suite(feuille,fichiersql,nomfichier,cheminfichier,monbat){
    return new Promise( (resolve,reject) => {
        platform.Main(feuille,fichiersql)
            .then( requete => {
                var magasin      = feuille[4][0];
                var dossierhisto = path.join(__dirname,"..","histo"+magasin,nomfichier)
                return { magasin: magasin, fichiersql: fichiersql, dossierhisto: dossierhisto, requete: requete }
            })
            .then( data => {
                libFile.SetFile(data.fichiersql, data.requete)
                    .then( res => {
                        return true;
                    }, err => reject(err) )
                    .then( res => {
                        sqlplus.Commit({magasin: data.magasin, fichieravecchemin: fichiersql, fichierorigine: cheminfichier}, monbat);
                        setTimeout(() => resolve(cheminfichier), 8000);
                    }, err => reject(err) )
            })
    })    
}

function Main(fichier){
    return new Promise( (resolve,reject) => {
        date = new Date().getTime();
        chemin      = path.dirname(fichier)
        extension   = path.extname(fichier)
        nomfichier  = path.basename(fichier)
        var monfichiersql = nomfichier+"-"+date+".sql"
        var fichiersql    = path.join(chemin,'..',monfichiersql)
        var monbat        = path.join(chemin,'..','execute.bat')
        if (extension == '.xlsx') { 
            var feuille = xlsx.ExtractXlsx(`${fichier}`);
            Suite(feuille,fichiersql,nomfichier,fichier,monbat)
                .then( res => resolve(res), err => reject(err) ) 
        }
        if (extension == '.csv') { 
            csv.ExtractCsv(`${fichier}`)
                .then(feuille => {
                    Suite(feuille,fichiersql,nomfichier,fichier,monbat)
                        .then( res => resolve(res), err => reject(err) )
                })
        }
        //if (extension == '.csv') { var feuille = xlsx.ExtractCsv(`${fichier}`) }
        //resolve(Suite(feuille,fichiersql,nomfichier,fichier,monbat))
    })
}

module.exports.Main = Main
