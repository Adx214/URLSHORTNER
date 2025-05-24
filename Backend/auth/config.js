const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const user = require('../schema/user');
const bcrypt = require('bcrypt');

const auth = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'uid' }, async (username, password, done) => {
        try {
            const u = await user.findOne({
                userid: username
            });
            if (!u) {
                return done(null, false, { message: 'Incorrect username or password' });
            }
            const pass = await bcrypt.compare(password, u.password);
            if (!pass) {
                return done(null, false, { message: 'Incorrect username or password' });
            }
            return done(null, u, { message: 'Logged in successfully' });
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id); // store user id in session
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const u = await user.findById(id);
            done(null, u); // attach user object to req.user
        } catch (err) {
            done(err);
        }
    });
};

module.exports = auth;
