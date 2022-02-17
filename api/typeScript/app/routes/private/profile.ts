// Packages
import express from 'express';
import profileController from "../../controllers/user/ProfileController";
import changeUsernameValidator from "../../validators/private/profile/ChangeUsernameValidator";
import validateRequest from "../../middlewares/ValidateRequest";
import userInformationUpdateValidator from "../../validators/private/profile/UserInformationUpdateValidator";
import billingInformationUpdateValidator from "../../validators/private/profile/BillingInformationUpdateValidator";
import requestProcessValidator from "../../validators/private/profile/RequestProcessValidator";
import removeFriendValidator from "../../validators/private/profile/RemoveFriendValidator";
import privacySettingValidator from "../../validators/private/profile/PrivacySettingValidator";
import privacySettingController from "../../controllers/user/setting/PrivacySettingController";
import changeStatusValidator from "../../validators/private/profile/ChangeStatusValidator";
import notificationSettingValidator from "../../validators/private/profile/NotificationSettingValidator";
import notificationSettingController from "../../controllers/user/setting/NotificationSettingController";

const router = express.Router();

// Helpers
//const upload = require('@helpers/uploadImages');

router.get('/', profileController.profileIndex);
router.get('/change-username', profileController.changeUsernameIndex);
router.post('/change-username', changeUsernameValidator.handle(), validateRequest.handle, profileController.changeUsername);
router.get('/information', profileController.InformationIndex);
router.post('/information', userInformationUpdateValidator.handle(), validateRequest.handle, profileController.updateInformation);
router.get('/billing-information', profileController.billingInformationUpdateIndex);
router.post('/billing-information', billingInformationUpdateValidator.handle(), validateRequest.handle, profileController.billingInformationUpdate);
router.get('/friends-requests', profileController.friendsRequestIndex);
router.get('/friends-requests/:username/:mode', requestProcessValidator.handle(), validateRequest.handle, profileController.requestProcess);
router.get('/friends-list', profileController.friendsListIndex);
router.get('/friends-list/:username/remove', removeFriendValidator.handle(), validateRequest.handle, profileController.removeFriend);
router.get('/block-list', profileController.blockListIndex);
router.post('/setting/privacy', privacySettingValidator.handle(), validateRequest.handle, privacySettingController.update);
router.get('/setting/privacy', privacySettingController.privacyIndex);
router.post('/setting/privacy/status', changeStatusValidator.handle(), validateRequest.handle, privacySettingController.changeStatus);
router.get('/setting/privacy/status', privacySettingController.changeStatusIndex);
router.post('/setting/notification', notificationSettingValidator.handle(), validateRequest.handle, notificationSettingController.update);
router.get('/setting/notification', notificationSettingController.notificationIndex);
//router.get("/upload", AuthenticateApi.handle, profileController.uploadProfilePicture);
//router.post('/upload', upload.single('image'), convertFileToField.handle, fileUploadValidator.handle(), validateRequest.handle, AuthenticateApi.private, profileController.uploadProcess);

export {router as profileRouter};
