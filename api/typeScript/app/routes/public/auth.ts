import express from 'express';
import passport from 'passport';
import registerValidator from "../../validators/public/auth/RegisterValidator";
import validateRequest from "../../middlewares/ValidateRequest";
import registerController from "../../controllers/auth/RegisterController";
import loginController from "../../controllers/auth/LoginController";
import loginValidator from "../../validators/public/auth/LoginValidator";
import forgotPasswordValidator from "../../validators/public/auth/ForgotPasswordValidator";
import forgotPasswordController from "../../controllers/auth/ForgotPasswordController";
import resetPasswordController from "../../controllers/auth/ResetPasswordController";
import resetPasswordValidator from "../../validators/public/auth/ResetPasswordValidator";
import guestController from "../../controllers/auth/GuestController";
import googleAuthController from "../../controllers/auth/socials/GoogleAuthController";

const router = express.Router();

router.post('/register', registerValidator.handle(), validateRequest.handle, registerController.process);
router.post('/login', loginValidator.handle(), validateRequest.handle, loginController.process);
router.post('/forgot-password', forgotPasswordValidator.handle(), validateRequest.handle, forgotPasswordController.process);
router.get('/reset-password/:token', resetPasswordController.index);
router.post('/reset-password/:token', resetPasswordValidator.handle(), validateRequest.handle, resetPasswordController.process);
router.get('/user', (req: any, res: any, next: any) => {
    try {
        res.send({user: req.user || null});
    } catch (e) {
        next(e);
    }
});

// ---------------------------Google Login Routers ---------------------------------------
router.get('/google', passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
}));
router.get('/google/callback', passport.authenticate('google', {session: false}), googleAuthController.callBack);
// --------------------------------------------------------------------------------------
router.post('/guest', guestController.process);
router.post('/guest/convert-to-user', registerValidator.handle(), guestController.convertGuestToUser);
// ---------------------------Facebook Login Routers ---------------------------------------
// router.get('/auth/facebook', passport.authenticate('facebook'));
//
// router.get('/auth/facebook/callback',
//     passport.authenticate('facebook', {
//         successRedirect: '/',
//         failureRedirect: '/login'
//     }));

// -------------------------------------------------------------------------------------

router.get('/logout', (req: any, res: any) => {
    req.logout();
    res.clearCookie('jwt-token');
    res.json('logout');
});

export {router as authRouter};
