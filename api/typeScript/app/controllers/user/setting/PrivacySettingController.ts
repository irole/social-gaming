import {ServerError} from '../../../errors/ServerError';
import Controller from "../Controller";
import privacySettingService from "../../../services/PrivacySettingService";
import translate from "../../../helpers/translate";


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
            if (result === 200) return this.success(translate(req,__filename,'update-setting-changed','Your privacy Setting Updated Successfully !'), res);
            throw new ServerError(translate(req,__filename,'update-server-error','Sever Error !'));
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
            if (result === 200) return this.success(translate(req,__filename,'change-status-change-successfully','your status changed successfully'), res);
            throw new ServerError(translate(req,__filename,'change-status-server-error','server Error!'));
        } catch (e: any) {
            next(e);
        }
    }
}

export default new PrivacySettingController();
