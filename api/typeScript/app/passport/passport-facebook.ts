
// Packages
import userService from "../services/UserService";

const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;


//-------------- Passport Setup---------------
passport.serializeUser(function (user: any, done: any) {
    done(null, user.id);
});

passport.deserializeUser(async (id: any, done: any) => {
    const user = await userService.findById(id);
    if (!user) done(user, null);
    else done(null, user);
});
//---------------------------------------------
passport.use(new FacebookStrategy({
        clientID: Option['service'].facebook.app_id,
        clientSecret: Option['service'].facebook.app_secret,
        callbackURL: Option['service'].facebook.callback_url
    },
    function (accessToken, refreshToken, profile, done) {
        // User.findOrCreate(..., function (err, user) {
        //     if (err) {
        //         return done(err);
        //     }
        //     done(null, user);
        // });
    }
));
