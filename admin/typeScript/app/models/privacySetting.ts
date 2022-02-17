const mongoose = require('mongoose');
const {Schema} = mongoose;

const privacySettingSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true},
    whoCanSeeFriends: {type: String, default: "everyOne"},
    whoCanJoinGameLobby: {type: String, default: "friends"},
    whoCanJoinTalkRoom: {type: String, default: "friends"},
    whoCanSeeGamesHistory: {type: String, default: "everyOne"},
    whoCanSeeGamesAchievements: {type: String, default: "everyOne"},
    whoCanSeeGamesClips: {type: String, default: "everyOne"},
    whoCanSeeGamesStats: {type: String, default: "everyOne"},
    whoCanSeeWhatsGameYouPlaying: {type: String, default: "everyOne"},
    whoCanSeeBiography: {type: String, default: "everyOne"},
    whoCanSendGameInvite: {type: String, default: "everyOne"},
    whoCanSendTalkRoomInvite: {type: String, default: "everyOne"},
    whoCanSendMessage: {type: String, default: "everyOne"},
    onlineStatus: {type: String, default: "online"},
    realStatus: {type: String, default: "online"}
}, {
    timestamps: true, toJSON: {
        transform(doc: any, ret: any) {
            ret.id = ret._id;
            delete ret._id;
        },
        virtuals: true,
        versionKey: false // __v : 0
    }
});

export default mongoose.model('PrivacySetting', privacySettingSchema);
