/*Dependance minimum pour creer un serveur web*/
const http    = require('http');
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const bodyParser = require('body-parser');

/*Mes lib*/
const users = require('./routes/users');

/*Minimum pour express*/
const app       = express();
const servers   = http.createServe(app);

/*Route et min secu de nos routes*/
app.use(cors());
app.user(bodyParser.json());
app.use('/api/users', users)

/*Middleware*/
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './index.html')) );

/*Lancement du serveur*/
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", () => console.log(`Server lancé sur ${server.adress().adress}:${server.adress().port}`) );
