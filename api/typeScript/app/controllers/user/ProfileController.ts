import {ServerError} from '../../errors/ServerError';
import {ClientError} from '../../errors/ClientError';
import {ConflictError} from '../../errors/ConflictError';
import {NotFoundError} from '../../errors/NotFoundError';
import Controller from "./Controller";
import userService from "../../services/UserService";
import billingInformationService from "../../services/BillingInformationService";
import userRelationshipService from "../../services/UserRelationshipService";
import privacySettingService from "../../services/PrivacySettingService";
import translate from "../../helpers/translate";
// Packages
const fs = require('fs');


class ProfileController extends Controller {
    /* profile index (Get)*/
    async profileIndex(req, res, next) {
        try {
            let user = await userService.findById(req.user.id);
            //await userService.updateGeneralLevel(user.id);
            if (user) return this.success(this.transformInformation(req), res);
            throw new ServerError(translate(req,__filename,'profile-index-server-error','Server Error ! '));
        } catch (e) {
            next(e);
        }
    }

    transformInformation(req) {
        return {
            email: req.user.email,
            emailVerify: req.user.emailVerify,
            username: req.user.username,
            isGuest: req.user.isGuest,
            biography: req.user.biography,
            profilePicture: req.user.profilePicture,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            gender: req.user.gender,
            generalLevel: req.user.generalLevel,
            generalXP: req.user.generalXP,
            neededXP: req.user.neededXP
        };
    }

    /* ------------------------------------ */

    /* Change Username Index(Get) */
    async changeUsernameIndex(req, res, next) {
        try {
            if (!req.user.emailVerify) throw new ClientError(translate(req,__filename,'change-username-index-email-verify','you must verify your Email to change username ! '));

            const userCan = await userService.checkLastUpdateUsername(req.user.email);
            if (!userCan) throw new ClientError(`${translate(req,__filename,'change-username-index-update-date','you can\'t change your Username before :')} ${req.user.whenUserCanUpdateUsername.toLocaleString()}`);
            let data = {
                username: req.user.username,
                whenUserCanUpdateUsername: req.user.whenUserCanUpdateUsername,
            };
            return this.success(data, res);

        } catch (e: any) {
            next(e);
        }
    }

    /* Change Username (Post) */
    async changeUsername(req, res, next) {
        try {
            // Get Input Value
            let username = req.body.username;
            let checkUsername = await userService.checkUsernameExist(username);
            if (checkUsername) throw new ConflictError(translate(req,__filename,'change-username-user-exist','this username already exist !'));
            // change username
            let result = await userService.changeUsername(req.user.id, username);
            if (result === 200) return this.success(translate(req,__filename,'change-username-successful','username Changed Successfully !'), res);
            throw new ServerError(translate(req,__filename,'change-username-server-error','Server Error ! '));
        } catch (e: any) {
            next(e);
        }
    }

    /* update information Index(Get) */
    async InformationIndex(req, res, next) {
        try {
            if (!req.user.emailVerify) throw new ClientError(translate(req,__filename,'information-index-email-verify','you must verify your Email to update your information'));

            const data = {
                biography: req.user.biography,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                gender: req.user.gender,
                birthDay: req.user.birthDay,
            };
            return this.success(data, res);

        } catch (e) {
            next(e);
        }
    }

    /* update information (Post) */
    async updateInformation(req, res, next) {
        try {
            if (!req.user.emailVerify) throw new ClientError(translate(req,__filename,'information-update-email-verify','you must verify your Email to update your information'));
            // Update User information
            let result = await userService.updateInformation(req.user.id, req.body);
            // Check result
            if (result === 200) return this.success(translate(req,__filename,'information-update-successful','your information updated successfully'), res);
            throw new ServerError(translate(req,__filename,'information-update-server-error','Server Error ! '));
        } catch (e) {
            next(e);
        }
    }

    /* billing information Index(Get) */
    async billingInformationUpdateIndex(req, res, next) {
        try {
            if (!req.user.emailVerify) throw new ClientError(translate(req,__filename,'billing-information-update-email-verify','you must verify your Email to update your billing information'));
            let userBillingInformation = await billingInformationService.findOne({user: req.user.id});
            let data = {
                firstName: userBillingInformation.firstName,
                lastName: userBillingInformation.lastName,
                birthDay: userBillingInformation.birthDay,
                city: userBillingInformation.city,
                state: userBillingInformation.state,
                country: userBillingInformation.country,
                zipCode: userBillingInformation.zipCode,
                countryCode: userBillingInformation.countryCode,
                phoneNumber: userBillingInformation.phoneNumber,
                phoneNumberVerify: userBillingInformation.phoneNumberVerify,
                creditNumber: userBillingInformation.creditNumber,
                CVV: userBillingInformation.CVV,
            };
            return this.success(data, res);
        } catch (e) {
            next(e);
        }
    }

    /* update billing information (Post) */
    async billingInformationUpdate(req, res, next) {
        try {
            if (!req.user.emailVerify) throw new ClientError(translate(req,__filename,'update-billing-information-update-email-verify','you must verify your Email to update your billing information'));
            // Update User billing information
            let result = await billingInformationService.updateBillingInformation(req.user.id, req.body);
            // check Result
            if (result === 200) return this.success(translate(req,__filename,'update-billing-information-successful','your billing information updated successfully!'), res);
            throw new ServerError(translate(req,__filename,'update-billing-information-server-error','Server Error ! '));
        } catch (e) {
            next(e);
        }
    }

    /* friends request List Index(Get) */
    async friendsRequestIndex(req, res, next) {
        try {
            let userRelationShip = await userRelationshipService.findOne({user: req.user.id}, [{
                path: 'friendsRequestList',
                select: 'username'
            }], {createdAt: -1});
            let data: any = {
                friendsRequestList: []
            };
            userRelationShip.friendsRequestList.forEach(friendsRequest => {
                data.friendsRequestList.push(friendsRequest.username);
            });
            return this.success(data, res);
        } catch (e) {
            next(e);
        }
    }

    /* request Process information (Get) */
    async requestProcess(req, res, next) {
        try {
            // get requester username from param
            const requesterUsername = req.params.username;
            // get receiver id
            const receiverId = req.user.id;
            // find requester id with username
            let requesterId = await userService.findIdWithUsername(requesterUsername);
            // requester not found
            if (requesterId === 404) throw new NotFoundError(translate(req,__filename,'request-process-user-not-exist','Your Requested User not Found !'))
            // send users information to service
            await userRelationshipService.findUsers(receiverId, requesterId);
            // check requester in receiver request list
            if (!userRelationshipService.getReceiverFriendsRequestList().includes(userRelationshipService.getRequesterId())) throw new NotFoundError(translate(req,__filename,'request-process-user-not-in-request-list','This User Dose not in your Request List !'));
            let result;
            // Reject
            if (req.params.mode === 'reject') {
                // Request Process
                result = await userRelationshipService.requestProcess(receiverId, requesterId, 'reject');
                if (result === 200) return this.success(translate(req,__filename,'request-process-reject-request','you are reject this request'), res);
            } else { // accept
                // Request Process
                result = await userRelationshipService.requestProcess(receiverId, requesterId, 'accept');
                if (result === 200) return this.success(translate(req,__filename,'request-process-accept-request','accept successfully you are now friends'), res);
            }
            // when server Error
            throw new ServerError(translate(req,__filename,'request-process-server-error','Server Error !'));
        } catch (e: any) {
            next(e);
        }
    }

    /* friends List Index(Get) */
    async friendsListIndex(req, res, next) {
        try {
            let userRelationShip = await userRelationshipService.findOne({user: req.user.id}, [{
                path: 'friendsList',
                select: 'username'
            }], {createdAt: -1});
            return this.success(await this.generateFriendList(userRelationShip.friendsList, req.user.id), res);
        } catch (e) {
            next(e);
        }
    }

    async generateFriendList(friendList, requesterUserId) {
        let friends: any = [];
        let userCanJoinGameLobby: any = false,
            userCanJoinTalkRoom: any = false,
            userCanSendGameInvite: any = false,
            userCanSendTalkRoomInvite: any = false,
            userCanSendMessage: any = false;
        for (const friend of friendList) {
            let receiverUserId = friend.id;
            userCanSendTalkRoomInvite = await privacySettingService.userCanSendTalkRoomInvite(receiverUserId, requesterUserId);
            userCanSendMessage = await privacySettingService.userCanSendMessage(receiverUserId, requesterUserId);
            userCanSendGameInvite = await privacySettingService.userCanSendGameInvite(receiverUserId, requesterUserId);
            userCanJoinTalkRoom = await privacySettingService.userCanJoinTalkRoom(receiverUserId, requesterUserId);
            userCanJoinGameLobby = await privacySettingService.userCanJoinGameLobby(receiverUserId, requesterUserId);
            let privacySetting = {
                userCanSendTalkRoomInvite,
                userCanSendMessage,
                userCanSendGameInvite,
                userCanJoinTalkRoom,
                userCanJoinGameLobby
            };
            friends.push({username: friend.username, privacySetting});
        }
        return friends;
    }

    /*----------------------------------------*/

    /* Remove friend List Index(Get) */
    async removeFriend(req, res, next) {
        try {
            const receiverUsername = req.params.username;
            // get user one id
            const requesterId = req.user.id;
            // get user two id
            const receiverId = await userService.findIdWithUsername(receiverUsername);
            // if receiver not found
            if (receiverId === 404) throw new NotFoundError(translate(req,__filename,'remove-friend-user-not-found','this user name not found !'))
            // check users are friend
            let result: any = await userRelationshipService.usersAreFriends(receiverId, req.user.id);
            if (!result) throw new ClientError(translate(req,__filename,'remove-friend-users-arent-friend','you are not friend together !'));
            // Remove Friend Request
            result = await userRelationshipService.removeFriend(requesterId, receiverId);
            // check result
            if (result === 200) return this.success(translate(req,__filename,'remove-friend-remove-friend.success-remove','you are not friends any more !'), res);
            throw new ServerError(translate(req,__filename,'remove-friend-server-error','server error please try again later !'))
        } catch (e: any) {
            next(e);
        }
    }

    /* block user List Index(Get) */
    async blockListIndex(req, res, next) {
        try {
            const userRelationShip = await userRelationshipService.findOne({user: req.user.id}, [{
                path: 'blockedUsersList',
                select: 'username'
            }], {createdAt: -1});
            let data: any = {
                blockedUsersList: []
            };
            userRelationShip.blockedUsersList.forEach(blockedUser => {
                data.blockedUsersList.push(blockedUser.username);
            });
            return this.success(data, res);
        } catch (e) {
            next(e);
        }
    }

    async uploadProfilePicture(req, res, next) {
        try {
            if (req.user.emailVerify) {
                return res.render('home/upload');
            }
            throw new ClientError(translate(req,__filename,'upload-profile-picture-email-verify','you must verify email before change profile picture'));
        } catch (e: any) {
            next(e);
        }
    }

    async uploadProcess(req, res, next) {
        try {
            // Find user with Id
            let user = await userService.findById(req.user.id);
            // Delete Old Profile picture when exist
            if (user.profilePicture !== null) {
                //--------------Delete Images ------------------
                fs.unlinkSync(`./public${user.profilePicture}`);
                //------------------------------------------------
            }
            // Update User Profile Picture
            let result = await userService.findByIdAndUpdate(req.user.id, {profilePicture: req.body.file.url});
            if (result) return this.success(translate(req,__filename,'upload-process-successful','your profile picture upload successfully !'), res);
            throw new ServerError(translate(req,__filename,'upload-process-server-error','Server Error please try Again later!'));
        } catch (e: any) {
            next(e);
        }
    }
}

export default new ProfileController();
