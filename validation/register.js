const validateEmptyFields = require('./emptyFields');
const mergeErrors = require('./mergeErrors');
const {
    name,
    email,
    password,
} = require('./fields');

module.exports = function validateRegisterInput(data) {
    const emptyFieldsErrors = validateEmptyFields(['name', 'email', 'password', 'verifyPassword'], data);
    const nameErrors = name(data);
    const emailErrors = email(data);
    const passwordErrors = password(data);
    const errors = mergeErrors(emptyFieldsErrors, nameErrors, emailErrors, passwordErrors);

    return {
        errors,
        isValid: isEmpty(errors)
    };
};