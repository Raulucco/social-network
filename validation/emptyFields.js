const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function (fields, data) {
    const errors = {};
    fields.forEach(key => {
        data[key] = !isEmpty(data[key]) ? data[key] : '';

        if (validator.isEmpty(data[key])) {
            errors[key] = [`${key} is required`];
        }
    });
    return errors;
}