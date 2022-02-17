// Interfaces
import {AuthenticateApiInterface} from '../Interfaces/AuthenticateApiInterface';
import {ClientError} from '../errors/ClientError';
import {ServerError} from '../errors/ServerError';
import Middleware from "./Middleware";
import translate from "../helpers/translate";

// Packages
const passport = require('passport');



class AuthenticateApi extends Middleware implements AuthenticateApiInterface {

    public(req, res, next) {
        // Passport JWT Strategy
        passport.authenticate('jwt', {session: false}, (err, user) => {
            // Check Error or User
            if (!user) return next();
            req.user = user;
            next();
        })(req, res, next);
    }

    // Change Later
    semiPrivate(req, res, next) {
        // Passport JWT Strategy
        passport.authenticate('jwt', {session: false}, (err, user, info): void => {
            if (info && info.message && !user) {
                throw new ClientError(translate(req,__filename,'semi-private-access-denied','You Must be Registered / Logged in to Access this action'), 401);
            }
            if (err && err.status) {
                if (err.code === 401) return next(new ClientError(translate(req,__filename,'semi-private-access-denied-jwt-401','You do not have permission to access this link'), 401));
                if (err.code === 500) return next(new ServerError(translate(req,__filename,'semi-private-access-server-error','Server Error !')));
            }
            next();
        })(req, res, next);
    }

    private(req, res, next) {
        // Passport JWT Strategy
        passport.authenticate('jwt', {session: false}, (err, user, info): void => {
            if (info && info.message && !user) {
                throw new ClientError(translate(req,__filename,'private-access-denied','You Must be Registered / Logged in to Access this action'), 401);
            }
            // Check Error or User

            if (err) {
                if (err.code === 401) return next(new ClientError(translate(req,__filename,'private-access-denied-jwt-401-guest','You Must be Registered / Logged in to Access this action'), 401));
                if (err.code === 500) return next(new ServerError(translate(req,__filename,'private-access-server-error','Server Error !')));
            }
            next();
        })(req, res, next);
    }

}

export default new AuthenticateApi();
