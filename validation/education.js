const emptyFields = require('./emptyFields');

module.exports = function (data) {
    const errors = validateEmptyFields(['degree', 'school', 'from'], data);

    return {
        errors,
        isValid: isEmpty(errors)
    };
}