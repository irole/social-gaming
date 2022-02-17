// Packages
import passport from 'passport';
import billingInformationService from "../services/BillingInformationService";
import notificationSettingService from "../services/NotificationSettingService";
import privacySettingService from "../services/PrivacySettingService";
import userRelationshipService from "../services/UserRelationshipService";
import userService from "../services/UserService";

const googleStrategy = require('passport-google-oauth').OAuth2Strategy;




//-------------- Passport Setup---------------
passport.serializeUser(function (user: any, done: any) {
    done(null, user.id);
});

passport.deserializeUser(async (id: any, done: any) => {
    let user = await userService.findById(id);
    if (!user) done(user, null);
    else done(null, user);
});
//---------------------------------------------

passport.use(new googleStrategy({
    clientID: Option['service'].google.client_id,
    clientSecret: Option['service'].google.client_secret,
    callbackURL: Option['service'].google.callback_url,
}, async (token, refreshToken, profile, done) => {
    // Select User Where Google email
    const user = await userService.findOne({email: profile._json.email});
    // If User Found Redirect To home Page
    if (user) return done(null, user);
    // If User not Found add in Database
    if (!user) {
        const newUser = await userService.insert({
            email: profile._json.email,
            password: userService.bcryptPassword(profile._json.sub),
            username: userService.defineUsername(),
        });
        await billingInformationService.insert({user: newUser.id});
        await notificationSettingService.insert({user: newUser.id});
        await privacySettingService.insert({user: newUser.id});
        await userRelationshipService.insert({user: newUser.id});
        return done(null, newUser);
    }
}));
