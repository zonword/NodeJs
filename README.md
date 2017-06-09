# Mes Librairies NodeJs

*Du code que je réutilise souvent sont dans ce depot*

Les codes qui ne mérite aucune explication sont disponible dans le depot
les autres en explication ci-dessous

## Sommaire

   1. [setInterval](#setInterval) Répétition d'évenement
   1. [](#) Rien
   
## setInterval
   Je l'utilise quand j'ai besoin de répéter du code tout les `X` secondes,
   petit truc en plus c'est que défois l'evenement n'est pas terminé, et il relance une autre événement
   donc je detruit la boucle d'evenement dans celle-ci, et la réactive en fin
   
```javascript
var _myXtime    = 4000
var _myinterval = null

function MyMainEvent(){
  let time = _myXtime * 3
  MyFuncInterval(false, (err,clear) => {
    if(!err){
      setTimeout( () => {
        console.log(`Hello World`)
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
