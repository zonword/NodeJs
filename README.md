# NodeJs

NodeJs est une plate-forme de programmation Javascript développé en C, basé sur le moteur V8 de Google, et permet de développer coté serveur comme PHP, J2EE, Ruby On Rails.

Node représente un environnement d'execution (runtime), un enssemble d'API Javascript ansi qu'une machine virtuelle performante (parseur, interpreteur, et compilateur) pouvant accéder à des ressources système telle que des fichiers et des connexions réseaux (`filesystem`, `socket`,...), nécéssitant tres peu de ressource `streams` qui est un réel avantage pour transformer de gros flux de données ou de fichier faisant plusieur giga-octets avec peu de mémoire.
Souvent utilisé pour du Chat(Discussion instantanné), Data Streaming (dataviz en temp réel), Proxy(`NgINX`), Logiciel, Monitoring (`PM2`, `Keymetrics`), Server-Side (`Express`)  

Node nous permet d'écrire du `événementiel` (event) et `non bloquante` (asynchrone), elle comporte une communaité qui n'arrête pas d'augmenter avec plus de 380 000 paquets sur le registre npm, 6 milliards de téléchargement par mois, et 65 000 éditeurs.

Ils l'ont fait confiance : Paypal, Ebay, Amazon, LinkedIN, Uber, Netflix, Spotify, La Poste, grouv.fr

## Sommaire

   1. [Astuce](#astuce)
   1. [Proxy](#proxy)
   1. [Set Donnée Tableau](#set-donnee-tableau)
   1. [Callback et Promise](#callback-et-promise)
   1. [Boucle Avec Condition](#boucle-avec-condition)
   1. [setInterval](#setInterval) Répétition d'évenement
   1. [respawn](https://github.com/mafintosh/respawn) Permet de se relancer a l'interieur de son programme à la fin d'un traitement
   1. [Mirror Folder](https://github.com/mafintosh/mirror-folder) Permet de réaliser de la sauvegarde en automatique d'un dossier
   1. [Why is node running](https://github.com/mafintosh/why-is-node-running) savoir ce qu'un programme node fait
   1. [ssh-exec](https://github.com/mafintosh/ssh-exec) exécuter du code SSH
   1. [on-wake-up](https://github.com/mafintosh/on-wake-up) fonction qui est appelé au reveil de son ordinnateur
   1. [airscreen](https://github.com/mafintosh/airscreen) génère une session d'ecran partagé
   1. [tetris](https://github.com/mafintosh/tetris) un tetris
   1. [jszip](https://github.com/pfrazee/jszip) créer lire éditer un zip
   1. [extract-zip](https://github.com/maxogden/extract-zip) extraire un zip
   1. [cluster](#cluster) chapitre sur les cluster

### Astuce

Uniquement sous Unix, vous pouvez demarrer le programme directement sans appelé Node, si votre programme commence comme ci-dessous

```JAVASCRIPT
#!/usr/bin/env node
'use strict';
 ```
 
 mais avant il faut le rendre executable par le systeme
 
 ```BATCH
 chmod +x monfichier.js
 ```

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
   
 Si on ne veux pas s'embeter à rajouter des fichiers à chaque fois, il suffit juste de de taper dans la console
 
 Pour rajouter un proxy à un npm
 ```BATCH
 npm config set proxy http://mon-proxy.com:port
 npm config set https-proxy http://mon-proxy.com:port
 ```
 
  Pour rajouter un proxy à atom
 ```BATCH
 apm config set proxy http://mon-proxy.com:port
 apm config set https_proxy http://mon-proxy.com:port
 ```

  Installer un package atom en CLI
   ```BATCH
 cd ~/.atom/packages
 git clone https://github.com/monpaquet
 cd monpaquet
 npm install
 ```
   
## Set donnée tableau

```Javascript
data = {
   personnes: [
      { 
         id     : 0, 
	 prenom : 'toto', 
	 nom    : '',
	 age    : '08' 
      },
      { 
         id     : 1, 
	 prenom : 'Bob', 
	 nom    : 'eponge',
	 age    : '56' 
      }
   ]
}

const personnes   = [...data.personnes];
const personIndex = data.personnes.findIndex( p => { return p.id == id; } );
const person      = { ...data.personnes[personIndex] };

person.prenom          = 'nobody';
personnes[personIndex] = person;

```

## Callback et Promise

NodeJs est très facile à manipuler, mais on peut vite être dépassé si on est pas rigoureux, en PHP le code est lit ligne par ligne,
Mais avec NodeJs c'est du code asynchrone, ça seras le code le plus rapide à exécuter, qui seras éxécuté en premier, donc les promises et les callbacks deviennent indispenssable.

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

un exemple de code un peu plus poussé

```javascript
var makeRequest = (options) => {
	var deferred = Q.defer();
	request.call(options, (err, result) => {
		if(err) { return deferred.reject(err); }
		deferred.resolve(result);
	});
	return deferred.promise;
};

var getRequest = (url) => {
	var deferred = Q.defer();
	var options = {
		method: "GET",
		url: url
	};
	makeRequest(options)
		.then((result) => {
			deferred.resolve(result);
		})
		.catch((error) => {
			deferred.reject(error);
		});
	return deferred.promise;
};

var getMyAccount = (accountId) => {
	var deferred = Q.defer();
	getRequest('/account/'+accountId)
		.then((result) => {
			deferred.resolve(result);
		})
		.catch((err) => {
			deferred.resolve(err);
		});
	return deferred.promise;
};
```

## Boucle Avec Condition
   On ne fait plus de boucle avec for, on préférera utiliser map ou filter, exemple d'utilisation
   
```javascript
var _personnes  = ["patron","secretaire","employé","interim"]

// retourne un tableau avec chaque element un "s" à la fin
const parcour = _personnes.map( personne => personne+"s" )
// retourne un tableau qu'avec l'élement "interim"
const check = _personnes.filter( personne => { return personne === "interim" } )
```

## setInterval
Je l'utilise quand j'ai besoin de répéter du code tout les `X` secondes,
petit detail à savoir c'est que quand le premier evenement n'est pas terminé, 
il faut pouvoir empecher le deuxième evement d'être déclanché,
pour cela il faut détruite la boucle au début du premier évenement, et la réactiver en fin.
`setInterval` remplace pour moi le `fs.watch` car je le trouve instable, et il n'est pas géré pareil sur chaque OS, sous unix il utilise inotify, MacOs utilise `...` et windows `...` et une fois implémenté dans notre code, il faut filtrer sur le type d'evenement qu'on veut agir `rename`,... et enfin récuperer sur ce qu'on a besoin un `fichier` ou un `dossier`.
   
Mais si vous y tenez à votre `watch` voici une librairie qui corrige les faiblesses de fs.watch qui s'apelle [recursive-watch](https://github.com/mafintosh/recursive-watch) il y a comme correction un rajout d'un timeout, car fs.watch sur certain action,trouve sur les gros fichiers plusieur événement, or qu'il y en as eu qu'un seul, il y'a d'autre correction mais biensur n'utilisé pas la librairie d'orgine fs.watch comme pour tout fs, préférer fs-extra, ou autre.

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

## Monitoring
   Il existe différents outil comme [respawn](https://github.com/mafintosh/respawn) et PM2 qui permet de gérer et lancer plusieur projets nodejs, avec un système de log et du reboot lors de possible crash, vous pouvez aller plus loin avec Keymetrics, qui n'est gratuit pour qu'un seul projet, mais si vous avez plusieur il faudra utiliser aussi sont porte monaie
   
## Stream

### READSTREAM
   fs.createReadStream ouvre le fichier comme un flux, et non en le stockant en intégralité dans une zone mémoire, trés utile pour traiter des gros fichier en simultannée, attention le readFile n'est pas inutile, on peut l'utiliser quand on a besoin de faire des opérations ligne par ligne, readStream seras plus utile lors de la construction fichier, la copie, ou remplir une variable

```javascript
var fs 	   = require('fs');
var stream = fs.createReadStream('fichier.txt');

stream.on('data', (data) => {
   var chunck = data.toString();
   process.stdout.write(chunck);
});

stream.on('end', () => {
   console.log();
});

stream.on('error', (error) => {
   console.error(error.message);
});
```
### WRITESTREAM
   fs.createWriteStream récupère les données, pipe est idéale pour les flux, il trouve tout sont utilité en sortie d'un flux ainsi qu'en entrée

```javascript
var fs = require('fs');
var readStream  = fs.createReadStream('IN.txt');
var writeStream = fs.createWriteStream('OUT.txt');

readStream.pipe(writeStream);
```

### Cluster
   Les applications par defaut avec nodejs sont mono-thread, deux méthode pour utiliser tout les cores d'un serveur 

- Lancer plusieur instances sur différent serveur avec un reverse proxy pour faire du land balancer
- Utiliser le mode cluster

La première méthode permet de partager au mieux la puissance de la machine entre les différentes instance, sans dégrader les performances en partageant les cores entre plusieurs instances

La deuxième un process est démarré en mode master, il à pour role de dispatcher aux process forkés qui eux sont dédiés au traitement qui sont en mode worker

```javascript
const recluster = require("cluster");
const os      = require("os");
const fs      = require("fs");

var cluster = recluster(path.join(__dirname, "server.js"), {
   /*Options*/
});

cluster.run();

process.on("SIGUSR2", function() {
   console.log("Signal SIGUSR2 reçus, rechargement du cluster ...");
   cluster.reload();
});

fs.watchFile('package.json', function(curr, prev) {
   console.log("package.json changé, rechargement du cluster ...");
   cluster.reload();
});

console.log("Cluster démarré, Utilisez la commande 'kill -s SIGUSR2 " + process.pid + "' pour le recharger.");
```
