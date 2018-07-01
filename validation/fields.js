const validator = require('validator');
const {
    get
} = require('../object-utils');

module.exports = {
    name(data) {
        const errors = {};
        if (!validator.isLength(data.name, {
                min: 2,
                max: 30
            })) {
            errors.name = ['Name must be between 2 and 30 characters long'];
        }
        return errors;
    },
    email(data) {
        const errors = {};
        if (!validator.isEmail(data.email)) {
            errors.email = ['Email should be valid'];
        }
        return errors;
    },
    password(data) {
        const errors = {};
        if (!validator.isLength(data.password, {
                min: 6,
                max: 16
            })) {
            errors.password = ['Password must be between 6 and 16 characters long'];
        }

        if (data.password !== data.verifyPassword) {
            errors.verifyPassword = ['Password must match'];
        }
        return errors;
    },
    url(data, prop) {
        return validator.isURL(get(data, prop)) ? {} : {
            [prop]: `${prop} is not a valid a url`
        };
    }
};