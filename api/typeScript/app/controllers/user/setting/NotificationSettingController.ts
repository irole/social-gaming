import {ServerError} from '../../../errors/ServerError';
import Controller from "../Controller";
import notificationSettingService from "../../../services/NotificationSettingService";
import translate from "../../../helpers/translate";


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
            if (result === 200) return this.success(translate(req,__filename,'update-setting-changed','Your Notification Setting Updated Successfully !'), res);
            throw new ServerError(translate(req,__filename,'update-server-error','Sever Error !'));
        } catch (e: any) {
            next(e);
        }
    }

}

export default new NotificationSettingController();
