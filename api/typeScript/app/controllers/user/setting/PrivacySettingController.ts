import {ServerError} from '../../../errors/ServerError';
import Controller from "../Controller";
import privacySettingService from "../../../services/PrivacySettingService";


class PrivacySettingController extends Controller {
    async privacyIndex(req, res, next) {
        try {
            const privacySetting = await privacySettingService.findOne({user: req.user.id});
            const data = {
                whoCanSeeFriends: privacySetting.whoCanSeeFriends,
                whoCanJoinGameLobby: privacySetting.whoCanJoinGameLobby,
                whoCanJoinTalkRoom: privacySetting.whoCanJoinTalkRoom,
                whoCanSeeGamesHistory: privacySetting.whoCanSeeGamesHistory,
                whoCanSeeGamesAchievement: privacySetting.whoCanSeeGamesAchievement,
                whoCanSeeGamesClips: privacySetting.whoCanSeeGamesClips,
                whoCanSeeGamesStats: privacySetting.whoCanSeeGamesStats,
                whoCanSeeWhatsGameYouPlay: privacySetting.whoCanSeeWhatsGameYouPlay,
                whoCanSeeBiography: privacySetting.whoCanSeeBiography,
                whoCanSendGameInvite: privacySetting.whoCanSendGameInvite,
                whoCanSendTalkRoomInvite: privacySetting.whoCanSendTalkRoomInvite,
            };
            return this.success(data, res);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            // Update Process
            const result = await privacySettingService.updatePrivacySetting(req.user.id, req.body);
            // Check Result
            if (result === 200) this.success(req.__('typeScript.app.http.controllers.api.user.setting.privacy-setting-controller.update.setting-updated'), res);
            throw new ServerError(req.__('typeScript.app.http.controllers.api.user.setting.privacy-setting-controller.update.server-error'));
        } catch (e: any) {
            next(e);
        }
    }

    async changeStatusIndex(req, res, next) {
        try {
            const privacySetting = await privacySettingService.findOne({user: req.user.id});
            const data = {
                onlineStatus: privacySetting.onlineStatus,
            };
            return this.success(data, res);
        } catch (e) {
            next(e);
        }
    }

    async changeStatus(req, res, next) {
        try {
            // get user Id
            const userId = req.user.id;
            // Get Input Value
            const status = req.body.onlineStatus;
            const result = await privacySettingService.setUserStatus(userId, status);
            // Check result
            if (result === 200) return this.success(req.__('typeScript.app.http.controllers.api.user.setting.privacy-setting-controller.change-status.change-successfully'), res);
            throw new ServerError(req.__('typeScript.app.http.controllers.api.user.setting.privacy-setting-controller.change-status.server-error'));
        } catch (e: any) {
            next(e);
        }
    }
}

export default new PrivacySettingController();
