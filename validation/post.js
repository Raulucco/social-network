const emptyFields = require('./emptyFields');
const validator = require("validator");

module.exports = function (data) {
    const errors = {};
    const emptyFieldsErrors = validateEmptyFields(['text'], data);
    if (validator.isLength(data.text, {
            min: 25,
            max: 1024
        })) {
        // Add error message
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}