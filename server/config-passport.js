const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


const userDB = {
    id: 1,
    email: "yanaobezyana@mail.com",
    password: 'admin'
};

passport.serializeUser(function(user, done) {
    console.log('Serialization', user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('Deserialization', id);
    const user = (userDB.id === id) ? userDB: false;
    done(null, user);
});

passport.use(new LocalStrategy({usernameField: "email"},
    function(email, password, done) {
        if(email === userDB.email && password === userDB.password){
            return done(null, userDB);
        }else {
            return done(null, false);
        }
    }
)); // passport local strategy