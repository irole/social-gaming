import Service from "./Service";
import NotificationSetting from "../models/notificationSetting";

class NotificationSettingService extends Service {
    constructor() {
        super(NotificationSetting);
    }

    async process(userId, mode) {
        let notificationSetting = await this.findOne({user: userId});
        return notificationSetting[`${mode}`]
    }

    async getFriendsGettingOnlineNotification(userId) {
        return await this.process(userId, "receiveFriendsGettingOnline")
    }

    async getNewMessageNotification(userId) {
        return await this.process(userId, "receiveNewMessage")
    }

    async getAchievementsUnlockedNotification(userId) {
        return await this.process(userId, "receiveAchievementsUnlocked")
    }

    async getTalkRoomInviteNotification(userId) {
        return await this.process(userId, "receiveTalkRoomInvite")
    }

    async getGameInviteNotification(userId) {
        return await this.process(userId, "receiveGameInvite")
    }

    async getReceiveFriendsRequestNotification(userId) {
        return await this.process(userId, "receiveFriendsRequest")
    }

    async updateNotificationSetting(userId, body) {
        let result = await this.findOneAndUpdate({user: userId}, {
            receiveFriendsGettingOnline: body.receiveFriendsGettingOnline,
            receiveNewMessage: body.receiveNewMessage,
            receiveAchievementsUnlocked: body.receiveAchievementsUnlocked,
            receiveTalkRoomInvite: body.receiveTalkRoomInvite,
            receiveGameInvite: body.receiveGameInvite,
        });
        if (result) return 200;
        return 500;
    }
}

export default new NotificationSettingService();
