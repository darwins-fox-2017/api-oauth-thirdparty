// FACEBOOK
var passport = require('passport');
var FacebookStrategy = require('passport-facebook')
    .Strategy;

passport.use(new FacebookStrategy({
        clientID: "1420197958030285",
        clientSecret: "2722281df2b0f30eb6267b2d71e1e701",
        // harus sama dengan URL di facebook developer
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

router.get('/auth/facebook',
    passport.authenticate('facebook', {
        failureRedirect: '/error'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        // memang kosong, & harus ada agar bisa redirect ke halaman selanjutnya
    });

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/error'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.send(res.req.user);
    });
