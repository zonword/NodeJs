const Validator = require('validator');
const isEmpty   = require('lodash/isEmpty);

function validateInput(data){
    let errors = {};
    
    if(Validator.isEmpty(data.username)) {
        errors.username = 'Ce champ est obligatoire';
    }
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Ce champ est obligatoire';
    }
    if(Validator.isEmpty(data.password)) {
        errors.password = 'Ce champ est obligatoire';
    }
    if(Validator.isEmpty(data.confirmpassword)) {
        errors.confirmpassword = 'Ce champ est obligatoire';
    }
    if(Validator.equals(data.password, data.confirmpassword)) {
        errors.confirmpassword = 'Différent du mot de passe';
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateInput
