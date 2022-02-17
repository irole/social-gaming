import {ServerError} from '../../../errors/ServerError';
import Controller from "../Controller";
import notificationSettingService from "../../../services/NotificationSettingService";


class NotificationSettingController extends Controller {
    async notificationIndex(req, res, next) {
        try {
            let notificationSetting = await notificationSettingService.findOne({user: req.user.id});
            let data = {
                receiveFriendsGettingOnline: notificationSetting.receiveFriendsGettingOnline,
                receiveNewMessage: notificationSetting.receiveNewMessage,
                receiveAchievementsUnlocked: notificationSetting.receiveAchievementsUnlocked,
                receiveTalkRoomInvite: notificationSetting.receiveTalkRoomInvite,
                receiveGameInvite: notificationSetting.receiveGameInvite,
            };
            return this.success(data, res);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            // Update Notification Setting
            let result = await notificationSettingService.updateNotificationSetting(req.user.id, req.body);
            // Check result
            if (result === 200) return this.success(req.__('typeScript.app.http.controllers.api.user.setting.notification-setting-controller.setting-updated'), res);
            throw new ServerError(req.__('typeScript.app.http.controllers.api.user.setting.notification-setting-controller.server-error'));
        } catch (e: any) {
            next(e);
        }
    }

}

export default new NotificationSettingController();
