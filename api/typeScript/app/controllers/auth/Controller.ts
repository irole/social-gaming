
import {ServerError} from '../../errors/ServerError';
import ApiController from "../ApiController";

// Packages
const jwt = require('jsonwebtoken');

export default class Controller extends ApiController {

    login(req, res, user, message, isGuest: boolean = false, statusCode: number = 200) {

        req.login(user, {session: false}, (err: any) => {
            if (err) throw new ServerError(err)
            const token = this.generateToken(user.id, isGuest);
            // Set Cookie
            let maxAge = 1000 * 60 * 60 * 24 * 10;
            if (isGuest) maxAge = 1000 * 60 * 60 * 24;
            res.cookie('jwt-token', token, {
                maxAge,
                httpOnly: true
            });

            return this.success({
                message,
                token,
            }, res, statusCode);
        });
    }

    generateToken(userId, isGuest) {
        let expireTime: number = 60 * 60 * 24;// 1 Day
        if (!isGuest) expireTime = 60 * 60 * 24 * 10; // 10 Day

        return jwt.sign({id: userId}, Option['jwt'].secret_key, {expiresIn: expireTime});
    }

};
