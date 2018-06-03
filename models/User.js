const schema = require('mongoose').Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);