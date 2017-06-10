# Mes Librairies NodeJs

*Du code que je réutilise souvent sont dans ce depot*

Les codes qui ne mérite aucune explication sont disponible dans le depot
les autres code que je juge important à savoir sont en explication ci-dessous

## Remarque

NodeJs est très facile à manipuler, mais on peut vite être dépassé si on est pas rigoureux, en PHP le code est li ligne par ligne
Mais avec NodeJs c'est du code asynchrone, ça seras le code le plus rapide à exécuter, qui seras éxécuté en premier, donc les promises et les callbacks sont indispensable

## Sommaire

   1. [setInterval](#setInterval) Répétition d'évenement
   1. [](#) Rien
   
## setInterval
   Je l'utilise quand j'ai besoin de répéter du code tout les `X` secondes,
   petit detail à savoir c'est que quand le premier evenement n'est pas terminé, 
   il faut pouvoir empecher l'evement suivant d'être déclanché,
   pour cela il faut détruite la boucle d'evenement dans celle-ci, et la réactiver en fin d'evenement
   
   `setInterval` remplace pour le `fs.watch` car je le trouve instable, et il n'est pas géré pareil sur chaque OS, sous unix il utilise inotify, MacOs utilise `...` et windows `...` et une fois implémenté dans notre code, il faut filtrer sur le type d'evenement qu'on veut agir `rename`,... et enfin récuperer sur ce qu'on a besoin un `fichier` ou un `dossier`
   
```javascript
var _myXtime    = 4000
var _myinterval = null

function MyMainEvent(){
  let time = _myXtime * 3
  MyFuncInterval(false, (err,clear) => {
    if(!err){
      setTimeout( () => {
        console.log(`Hello World`)
        MyFuncInterval(true)
      }, time)
    }
  })
}

function MyFuncInterval(flag,cb){
  if(flag == false && cb){
    cb(null,clearInterval(_myinterval))
  }
  if(flag == true){
    _myinterval = setInterval( () => {
       MyMainEvent()
    }, _myXtime)
  }
}

MyFuncInterval(true)
```
