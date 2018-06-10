const {
    JwtStrategy,
    ExtractJwt
} = require('passport-jwt');
const {
    secret
} = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwtPayload, done) => {
            User.findById(jwtPayload.id).then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            }).catch(err => done(err, false));
        })
    );
};