import {NotFoundError} from '../../errors/NotFoundError';
import {ServerError} from '../../errors/ServerError';
import Controller from "./Controller";
import userService from "../../services/UserService";
import userRelationshipService from "../../services/UserRelationshipService";
import translate from "../../helpers/translate";
// Packages
const passport = require('passport');


class ActionUsernameController extends Controller {

    async sendFriendRequest(req, res, next) {
        try {
            // get username with params
            const receiverUsername = req.params.username;
            // find receiver Id with username
            const userExist = await userService.checkUsernameExist(receiverUsername);
            if (!userExist) throw new NotFoundError(translate(req,__filename,'send-request-friend-not-found','your requested username not Found !'));
            const receiverId = await userService.findIdWithUsername(receiverUsername);
            // get requester user id
            const requesterId = req.user.id;
            // request Process
            let result = await userRelationshipService.sendRequest(receiverId, requesterId);
            // Check result
            if (result === 200) return this.success(translate(req,__filename,'send-request-friend-request-send','your request send successfully'), res);
            throw new ServerError(translate(req,__filename,'send-request-friend-server-error','Server Error ! '));
        } catch (e: any) {
            next(e);
        }
    }

    async blockUser(req, res, next) {
        try {
            // get username with params
            const receiverUsername = req.params.username;
            const userExist = await userService.checkUsernameExist(receiverUsername);
            if (!userExist) throw new NotFoundError(translate(req,__filename,'block-user-username-not-found','Your Requested Username not Found !'));
            // find receiver Id with username
            const receiverId = await userService.findIdWithUsername(receiverUsername);
            // get requester user id
            const requesterId = req.user.id;
            // Block Process
            const result = await userRelationshipService.blockUser(receiverId, requesterId);
            // check result
            if (result === 200) return this.success(translate(req,__filename,'block-user-username-block-successfully','user blocked successfully'), res);
            throw new ServerError(translate(req,__filename,'block-user-username-server-error','Server Error !'));
        } catch (e: any) {
            next(e);
        }
    }

    async unBlockUser(req, res, next) {
        try {
            // get username with params
            const receiverUsername = req.params.username;
            // get requester user id
            const requesterId = req.user.id;
            // find user id with username
            const receiverId = await userService.findIdWithUsername(receiverUsername);
            if (receiverId === 404) throw new NotFoundError(translate(req,__filename,'unblock-user-username-not-found','Your Requested Username not Found !'));
            // Un block process
            const result = await userRelationshipService.unBlockUser(receiverId, requesterId);
            // Check Result
            if (result === 200) return this.success(translate(req,__filename,'unblock-user-username-block-successfully','user unblocked successfully'), res);
            throw new ServerError(translate(req,__filename,'unblock-user-username-server-error','Server Error !'));
        } catch (e: any) {
            next(e);
        }
    }

    // async sendTalkRoomInvite(req, res, next) {
    //     try {
    //         // get username with params
    //         let receiverUsername = req.params.username.toLowerCase();
    //         // find receiver Id with username
    //         let receiverId = await userService.findIdWithUsername(receiverUsername);
    //         // get requester user id
    //         let requesterId = req.user.id;
    //         // Do Anything
    //         // results .... if success
    //         // return this.success(req.__('typeScript.app.http.controllers.api.user.public-profile-controller.send-talk-room-invite.invite-send'), res);
    //     } catch (e: any) {
    //         next(e);
    //     }
    // }
    //
    // async sendGameInvite(req, res) {
    //     if (!req.user) return this.failed(req.__('typeScript.app.http.controllers.api.user.public-profile-controller.send-game-invite.must-login'), res, Option['httpStatus'].s407);
    //     let receiverUserId = await userService.findIdWithUsername(req.params.username);
    //     let requesterUserId = req.user.id;
    //     if (receiverUserId && receiverUserId.code === 404) return this.error(req.__('typeScript.app.http.controllers.api.user.public-profile-controller.send-game-invite.user-not-found'), res, receiverUserId);
    //     if (receiverUserId === requesterUserId) return this.failed(req.__('typeScript.app.http.controllers.api.user.public-profile-controller.send-game-invite.request-conflict'), res, Option['httpStatus'].s409);
    //     let result = await privacySettingService.userCanSendGameInvite(receiverUserId, requesterUserId);
    //     if (result) return this.success(req.__('typeScript.app.http.controllers.api.user.public-profile-controller.send-game-invite.invite-send'), res);
    //     // Do anything
    //     return this.failed(req.__('typeScript.app.http.controllers.api.user.public-profile-controller.send-game-invite.invite-failed'), res, Option['httpStatus'].s423);
    // }

    // async reportUser(req, res) {
    //     if (!req.user) return this.failed(req.__('typeScript.app.http.controllers.api.user.public-profile-controller.report-user.must-login'), res, Option['httpStatus'].s407);
    //     let reporter = req.user.id;
    //     let reportedUser = await userService.findIdWithUsername(req.params.username);
    //     if (reportedUser && reportedUser.code === 404) return this.error(req.__('typeScript.app.http.controllers.api.user.public-profile-controller.report-user.user-not-found'), res, reportedUser);
    //     if (reporter === reportedUser) return this.failed(req.__('typeScript.app.http.controllers.api.user.public-profile-controller.report-user.request-conflict'), res, Option['httpStatus'].s409);
    //     // Get Input Value
    //     let reportText = req.body.reportText;
    //     // Report User
    //     let reportResult = await usersReportService.report(reporter, reportedUser, reportText);
    //     if (reportResult.code === 200) return this.success(req.__('typeScript.app.http.controllers.api.user.public-profile-controller.report-user.report-successfully'), res, reportResult);
    //     if (reportResult.code === 400) return this.failed(req.__('typeScript.app.http.controllers.api.user.public-profile-controller.report-user.bad-request'), res, reportResult);
    //     if (reportResult.code === 500) return this.error(req.__('typeScript.app.http.controllers.api.user.public-profile-controller.report-user.server-error'), res, reportResult);
    // }
    //
    // async sendMessage(req, res) {
    //     if (!req.user) return this.failed(req.__('typeScript.app.http.controllers.api.user.public-profile-controller.send-message.must-login'), res, Option['httpStatus'].s407);
    //     let receiverUserId = await userService.findIdWithUsername(req.params.username);
    //     let requesterUserId = req.user.id;
    //     if (receiverUserId && receiverUserId.code === 404) return this.error(req.__('typeScript.app.http.controllers.api.user.public-profile-controller.send-message.user-not-found'), res, receiverUserId);
    //     if (receiverUserId === requesterUserId) return this.failed(req.__('typeScript.app.http.controllers.api.user.public-profile-controller.send-message.request-conflict'), res, Option['httpStatus'].s409);
    //     let result = await privacySettingService.userCanSendMessage(receiverUserId, requesterUserId);
    //     if (result) return this.success(req.__('typeScript.app.http.controllers.api.user.public-profile-controller.send-message.invite-send'), res);
    //     // Do anything
    //     return this.failed(req.__('typeScript.app.http.controllers.api.user.public-profile-controller.send-message.invite-failed'), res, Option['httpStatus'].s423);
    // }
}

export default new ActionUsernameController();
