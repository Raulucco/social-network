const emptyFields = require('./emptyFields');

module.exports = function (data) {
    const errors = validateEmptyFields(['title', 'company', 'from'], data);

    return {
        errors,
        isValid: isEmpty(errors)
    };
}