const mongoose = require('mongoose');
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate');

const userRelationshipSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true},
    friendsList: [{type: Schema.Types.ObjectId, ref: 'User'}],
    friendsRequestList: [{type: Schema.Types.ObjectId, ref: 'User'}],
    blockedUsersList: [{type: Schema.Types.ObjectId, ref: 'User'}],
    blockedByList: [{type: Schema.Types.ObjectId, ref: 'User'}],
    friendsSuggestionList: [{type: Schema.Types.ObjectId, ref: 'User'}],
    friendsPendingList: [{type: Schema.Types.ObjectId, ref: 'User'}],
}, {
    timestamps: true, toJSON: {
        transform(doc: any, ret: any) {
            ret.id = ret._id
            delete ret._id;
        },
        virtuals: true,
        versionKey: false // __v : 0
    }
});

userRelationshipSchema.plugin(mongoosePaginate);

export default mongoose.model('UserRelationship', userRelationshipSchema);
