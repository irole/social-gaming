const mongoose = require('mongoose');
const {Schema} = mongoose;

const notificationSettingSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true},
    receiveFriendsGettingOnline: {type: Boolean, default: true},
    receiveFriendsRequest: {type: Boolean, default: true},
    receiveNewMessage: {type: Boolean, default: true},
    receiveAchievementsUnlocked: {type: Boolean, default: true},
    receiveTalkRoomInvite: {type: Boolean, default: true},
    receiveGameInvite: {type: Boolean, default: true},
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

export default mongoose.model('NotificationSetting', notificationSettingSchema);
