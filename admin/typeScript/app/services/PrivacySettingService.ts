import Service from "./Service";
import PrivacySetting from "../models/privacySetting";
import UserService from "./UserService";
import userRelationshipService from "./UserRelationshipService";

class PrivacySettingService extends Service {

    constructor() {
        super(PrivacySetting);
    }

    async process(receiverUserId, requesterUserId, mode) {
        let privacy = await this.findOne({user: receiverUserId});
        let status = privacy[`${mode}`];
        if (status === "everyOne") return true;
        if (status === "noBody") return false;
        if (status === "friends") return await userRelationshipService.usersAreFriends(receiverUserId, requesterUserId);
    }

    async userCanSeeFriends(receiverUserId, requesterUserId) {
        return await this.process(receiverUserId, requesterUserId, 'whoCanSeeFriends');
    }

    async userCanJoinGameLobby(receiverUserId, requesterUserId) {
        return await this.process(receiverUserId, requesterUserId, 'whoCanJoinGameLobby');
    }

    async userCanJoinTalkRoom(receiverUserId, requesterUserId) {
        return await this.process(receiverUserId, requesterUserId, 'whoCanJoinTalkRoom');
    }

    async userCanSeeGamesHistory(receiverUserId, requesterUserId) {
        return await this.process(receiverUserId, requesterUserId, 'whoCanSeeGamesHistory');
    }

    async userCanSeeGamesAchievements(receiverUserId, requesterUserId) {
        return await this.process(receiverUserId, requesterUserId, 'whoCanSeeGamesAchievements');
    }

    async userCanSeeGamesClips(receiverUserId, requesterUserId) {
        return await this.process(receiverUserId, requesterUserId, 'whoCanSeeGamesClips');
    }

    async userCanSeeGamesStats(receiverUserId, requesterUserId) {
        return await this.process(receiverUserId, requesterUserId, 'whoCanSeeGamesStats');
    }

    async userCanSeeWhatsGameYouPlaying(receiverUserId, requesterUserId) {
        let user = await UserService.findById(receiverUserId);
        if (user.status === "invisible") return false;
        return await this.process(receiverUserId, requesterUserId, 'whoCanSeeWhatsGameYouPlaying');
    }

    async userCanSeeBiography(receiverUserId, requesterUserId) {
        return await this.process(receiverUserId, requesterUserId, 'whoCanSeeBiography');
    }

    async userCanSendGameInvite(receiverUserId, requesterUserId) {
        return await this.process(receiverUserId, requesterUserId, 'whoCanSendGameInvite');
    }

    async userCanSendTalkRoomInvite(receiverUserId, requesterUserId) {
        return await this.process(receiverUserId, requesterUserId, 'whoCanSendTalkRoomInvite');
    }

    async userCanSendMessage(receiverUserId, requesterUserId) {
        return await this.process(receiverUserId, requesterUserId, 'whoCanSendMessage');
    }

    async setUserStatus(userId, userStatus) {
        let result = await this.findOneAndUpdate({user: userId}, {onlineStatus: userStatus});
        if (result) return 200
        return 500;
    }

    async userGetOffline(userId) {
        await this.findOneAndUpdate({user: userId}, {realStatus: "offline"});
    }

    async getUserStatus(userId) {
        let privacy = await this.findOne({user: userId});
        return privacy.onlineStatus;
    }

    // Just use for admins
    async getUserRealStatus(userId) {
        let privacy = await this.findOne({user: userId});
        return privacy.realStatus;
    }

    async updatePrivacySetting(userId, body) {
        let privacySetting = await this.findOneAndUpdate({user: userId}, {
            whoCanSeeFriends: body.whoCanSeeFriends,
            whoCanJoinGameLobby: body.whoCanJoinGameLobby,
            whoCanJoinTalkRoom: body.whoCanJoinTalkRoom,
            whoCanSeeGamesHistory: body.whoCanSeeGamesHistory,
            whoCanSeeGamesAchievements: body.whoCanSeeGamesAchievements,
            whoCanSeeGamesClips: body.whoCanSeeGamesClips,
            whoCanSeeGamesStats: body.whoCanSeeGamesStats,
            whoCanSeeWhatsGameYouPlaying: body.whoCanSeeWhatsGameYouPlaying,
            whoCanSeeBiography: body.whoCanSeeBiography,
            whoCanSendGameInvite: body.whoCanSendGameInvite,
            whoCanSendTalkRoomInvite: body.whoCanSendTalkRoomInvite,
            whoCanSendMessage: body.whoCanSendMessage,
        });
        let result = await privacySetting.save();
        if (result) return 200;
        return 500;
    }

}

export default new PrivacySettingService();
