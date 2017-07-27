# NodeJs

NodeJs est une plate-forme de programmation Javascript développé en C, basé sur le moteur V8 de Google, et permet de développer coté serveur comme PHP, J2EE, Ruby On Rails.

Node représente un environnement d'execution (runtime), un enssemble d'API Javascript ansi qu'une machine virtuelle performante (parseur, interpreteur, et compilateur) pouvant accéder à des ressources système telle que des fichiers et des connexions réseaux (`filesystem`, `socket`,...), nécéssitant tres peu de ressource `streams` qui est un réel avantage pour transformer de gros flux de données ou de fichier faisant plusieur giga-octets avec peu de mémoire.
Souvent utilisé pour du Chat(Discussion instantanné), Data Streaming (dataviz en temp réel), Proxy(`NgINX`), Logiciel, Monitoring (`PM2`, `Keymetrics`), Server-Side (`Express`)  

Node nous permet d'écrire du `événementiel` et `non bloquante` (asynchrone), elle comporte une communaité qui n'arrête pas d'augmenter avec plus de 380 000 paquets sur le registre npm, 6 milliards de téléchargement par mois, et 65 000 éditeurs.

Ils l'ont fait confiance : Paypal, Ebay, Amazon, LinkedIN, Uber, Netflix, Spotify.

Node encourage à créer de multiples application autonomes et modulaire au lieu d'une seul application monolitiques

## Sommaire

   1. [Callback et Promise](#callback-et-promise)
   1. [Boucle Avec Condition](#boucle-avec-condition)
   1. [setInterval](#setInterval) Répétition d'évenement
   1. [ArrayJson](#arrayjson) atteindre les différente clée d'un tableau JSON
   1. [respawn](https://github.com/mafintosh/respawn) Permet de se relancer a l'interieur de son programme à la fin d'un traitement
   1. [Mirror Folder](https://github.com/mafintosh/mirror-folder) Permet de réaliser de la sauvegarde en automatique d'un dossier
   1. [Why is node running](https://github.com/mafintosh/why-is-node-running) savoir ce qu'un programme node fait
   1. [ssh-exec](https://github.com/mafintosh/ssh-exec) exécuter du code SSH
   1. [on-wake-up](https://github.com/mafintosh/on-wake-up) fonction qui est appelé au reveil de son ordinnateur
   1. [airscreen](https://github.com/mafintosh/airscreen) génère une session d'ecran partagé
   1. [tetris](https://github.com/mafintosh/tetris) un tetris
   1. [jszip](https://github.com/pfrazee/jszip) créer lire éditer un zip
   1. [extract-zip](https://github.com/maxogden/extract-zip) extraire un zip

## Installation   

### PROXY
Dans un monde ou les menaces de piratage informatique sont de plus en plus fréquent et principalement non ciblé (WannaCry) la question sur la sécurité ne se pose plus, et en temps que Développeur travailler dans un environnement qui est complétement fermé, rend l'accées au autre service tiers plus compliqué, API, module npm, etc... .
il faut pouvoir configurer notre projet simplement, voici un petit morceau code pour que npm et bower puisse récupérer nos dépences depuis l'extérieur.
   
   .bowerrc
   ```Javascript
      {
        "proxy": "http://mon-proxy.com:port",
        "https-proxy":"http://mon-proxy.com:port"
      }
   ```
   
   .npmrc
   ```BATCH
      proxy=http://mon-proxy.com:port
      https-proxy=http://mon-proxy.com:port
   ```
   
## Callback et Promise

NodeJs est très facile à manipuler, mais on peut vite être dépassé si on est pas rigoureux, en PHP le code est lit ligne par ligne,
Mais avec NodeJs c'est du code asynchrone, ça seras le code le plus rapide à exécuter, qui seras éxécuté en premier, donc les promises et les callbacks deviennet indispenssable.

`callback` est équivalent à un `return`, le callback est mis en dernier paramamètre de la fonction, lors de l'appelle de cette fonction
le dernier paramètre seras une fonction qui à pour paramètre le resultat de la fonction appelé
```javascript
function Addition(var1,var2,cb){ cb(var1+var2) }

Addition(varA,varB, (resultat) => { console.log(resultat) })
```

`promise` est équivalent lui aussi à un `return`, la promise se retrouve en fin fonction, elle retourne uniquement quand la variable passé en paramètre est prète.
```javascript
function Addition(var1,var2){ return new Promise( resolve => resolve(var1+var2) )}

Addition(varA,varB).then( resultat => console.log(resultat))
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

## Monitoring
   Il existe différents outil comme [mafintosh](https://github.com/mafintosh/respawn) et PM2 qui permet de gérer et lancer plusieur projet nodejs, avec un système de log et du reboot lors de possible crash, vous pouvez allé plus loin mais cette fois il faudra dépensser un peu plus pour avoir de stats avec Keymetrics
