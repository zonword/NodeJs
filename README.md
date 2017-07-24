# Mes Librairies NodeJs

*Du code que je réutilise souvent sont dans ce depot*

Les codes qui ne mérite aucune explication sont disponible dans le depot
les autres code que je juge important à savoir sont en explication ci-dessous

## Remarque

NodeJs est très facile à manipuler, mais on peut vite être dépassé si on est pas rigoureux, en PHP le code est li ligne par ligne
Mais avec NodeJs c'est du code asynchrone, ça seras le code le plus rapide à exécuter, qui seras éxécuté en premier, donc les promises et les callbacks sont indispensable

## Sommaire

   1. [Boucle](#boucle) Creer une boucle
   1. [Boucle Avec Condition](#boucle-avec-condition) Une boucle avec condition
   1. [setInterval](#setInterval) Répétition d'évenement
   1. [ArrayJson](#arrayjson) atteindre les différente clée d'un tableau JSON
   1. [respawn](https://github.com/mafintosh/respawn) Permet de se relancer a l'interieur de son programme à la fin d'un traitement
   1. [Mirror Folder](https://github.com/mafintosh/mirror-folder) Permet de réaliser de la sauvegarde en automatique d'un dossier
   1. [Why is node running](https://github.com/mafintosh/why-is-node-running) savoir ce qu'un programme node fait
   1. [ssh-exec](https://github.com/mafintosh/ssh-exec) exécuter du code SSH
   1. [on-wake-up](https://github.com/mafintosh/on-wake-up) fonction qui est appelé au reveil de son ordinnateur
   1. [airscreen](https://github.com/mafintosh/airscreen) génère une session d'ecran partagé

## Boucle
   Creer une boucle avec des promises contient une petite subtilité qui je pense mèrite son petit paragraphe ici, je vous laisse faire les debug qu'il faut pour comprendre pourquoi la promesse est rendu à l'interieur de la boucle, et non à l'extérieur
   
```javascript
var _entreprise = []
var _personnes  = ["patron","secretaire","employé","interim"]

function _Add(unepersonne) {
   return new Promise( resolve => resolve(_entreprise.push(unepersonne)) )
}

function Boucle(){
  return new Promise ( (resolve) => {
     for(var i in _personnes){
        _Add(_personnes[i]).then(res => resolve(_entreprise))
     }
  })
}

Boucle().then( listes => console.log(listes) )
```

## Boucle Avec Condition
   Parcourir un tableau avec des controles dans celle-ci ce fait uniquement de cette manière, si vous avez du code ecris sous cette forme `for(var i = 0; i<files.length; i++)` c'est parfait pour du language synchrone mais par defaut javascript est asynchrone
   
```javascript
var _personnes  = ["patron","secretaire","employé","interim"]

function loop(tableau){
   var res = false
   for(var i in tableau){
      if(tableau[i] == "interim") { res = true } 			
   }
   return new Promise( resolve => resolve(res) )
}

loop(_personnes).then( tableau => console.log(tableau) )
```

## setInterval
   Je l'utilise quand j'ai besoin de répéter du code tout les `X` secondes,
   petit detail à savoir c'est que quand le premier evenement n'est pas terminé, 
   il faut pouvoir empecher l'evement suivant d'être déclanché,
   pour cela il faut détruite la boucle d'evenement dans celle-ci, et la réactiver en fin d'evenement
   
   `setInterval` remplace pour le `fs.watch` car je le trouve instable, et il n'est pas géré pareil sur chaque OS, sous unix il utilise inotify, MacOs utilise `...` et windows `...` et une fois implémenté dans notre code, il faut filtrer sur le type d'evenement qu'on veut agir `rename`,... et enfin récuperer sur ce qu'on a besoin un `fichier` ou un `dossier`.
   
   Mais si vous y tenez à votre `watch` voici une librairie qui corrige les faiblesses de fs.watch qui s'apelle [recursive-watch](https://github.com/mafintosh/recursive-watch)
   
```javascript
var _myXtime    = 4000
var _myinterval = null

function MyMainEvent(){
  let time = _myXtime * 3
  MyFuncInterval(false)
     .then( clear => {
        setTimeout( () => {
	   console.log(`Hello World`)
	   MyFuncInterval(true)
	}, time)
     })
}

function MyFuncInterval(flag){
  if(flag == false){
     return new Promise( resolve => resolve(clearInterval(_myinterval)))
  }
  if(flag == true){
     _myinterval = setInterval( () => MyMainEvent(), _myXtime)
  }
}

MyFuncInterval(true)
```

## ArrayJson
   Voici une façon peut connu pour atteindre des donnée d'un tableau JSON [source](https://blog.heroku.com/node-habits-2017#3-modernize-your-javascript)
   
   ```javascript
const combinations = [
   { number: "8.0.0", platform: "linux-x64" },
   { number: "8.0.0", platform: "darwin-x64" },
   { number: "7.9.0", platform: "linux-x64" },
   { number: "7.9.0", platform: "darwin-x64" }
];

for (let { number, platform } of combinations) {
   console.log(`node-v${number}-${platform}.tar.gz`);
}
```

## Nodemon
   Vous penser avoir une note sur Nodemon, et bien non, je vous ais trahit, car je vais vous parler de respawn, librairie de [mafintosh](https://github.com/mafintosh/respawn) il existe déja de nombreux tuto trés bien expliqué de nodemon sur google, mais respawn en as pas besoins tout est trés bien expliqué dans la documentation
