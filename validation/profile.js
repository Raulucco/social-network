const emptyFields = require('./emptyFields');
const mergeErrors = require('./mergeErrors');
const {
    url
} = require('./fields');

module.exports = function (data) {
    const emptyFieldsErrors = validateEmptyFields(['handle', 'status', 'skills'], data);

    const urlErrors = ['social.youtube', 'social.linkedin', 'website', 'social.twitter', 'facebook'].reduce((acc, current) => {
        return {
            ...acc,
            ...url(data, current)
        };
    }, {});
    const errors = mergeErrors(emptyFieldsErrors, urlErrors);
    return {
        errors,
        isValid: isEmpty(errors)
    };
}