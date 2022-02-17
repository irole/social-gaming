// Interfaces
import {AuthenticateApiInterface} from '../Interfaces/AuthenticateApiInterface';
import {ClientError} from '../errors/ClientError';
import {ServerError} from '../errors/ServerError';
import Middleware from "./Middleware";

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
                throw new ClientError('You Must be Registered / Logged in to Access this action', 401);
            }
            if (err && err.status) {
                if (err.code === 401) return next(new ClientError(err.message, 401));
                if (err.code === 500) return next(new ServerError(err.message));
            }
            next();
        })(req, res, next);
    }

    private(req, res, next) {
        // Passport JWT Strategy
        passport.authenticate('jwt', {session: false}, (err, user, info): void => {
            if (info && info.message && !user) {
                throw new ClientError('You Must be Registered / Logged in to Access this action', 401);
            }
            // Check Error or User

            if (err) {
                if (err.code === 401) return next(new ClientError(err.message, 401));
                if (err.code === 500) return next(new ServerError(err.message));
            }
            next();
        })(req, res, next);
    }

}

export default new AuthenticateApi();
