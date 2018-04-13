/*Si express dans ../index.js est en global non nécessaire*/
const express = require('express');

/*ce code doit être présent dans le front aussi*/
const validateInput = require('../shared/validation/input');

let router = express.Router();

router.post('/', (req, res) => {
  const { errors, isValid } = validateInput(req.body);
  
  if(isValid){ res.json( { success: true } ) }
  else { console.log(errors); res.status(400).json(errors); }
});

module.exports = router;
