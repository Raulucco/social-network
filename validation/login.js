const emptyFields = require('./emptyFields');
const mergeErrors = require('./mergeErrors');
const {
    email,
    password
} = require('./fields');

module.exports = function (data) {
    const emptyFieldsErrors = validateEmptyFields(['email', 'password'], data);
    const emailErrors = email(data);
    const passwordErrors = password({
        ...data,
        verifyPassword: data.password
    });

    const errors = mergeErrors(emptyFieldsErrors, emailErrors, passwordErrors);
    return {
        errors,
        isValid: isEmpty(errors)
    };
}