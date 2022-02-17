import Middleware from "./Middleware";

const i18n = require('i18n');

class Language extends Middleware {
    // Check website language
    handle(req, res, next) {
        try {
            const lang = req.signedCookies.lang;
            if (i18n.getLocales().includes(lang)) req.setLocale(lang);
            else req.setLocale(i18n.getLocale());
            next();
        } catch (err) {
            next(err);
        }
    }
}

export default new Language();
