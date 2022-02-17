const mongoose = require('mongoose');
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate');

const LobbySchema = Schema({
    game: {type: Schema.Types.ObjectId, ref: 'Game', required: true},
    playerNeed: {type: Number, default: 2},
    players: [{type: Schema.Types.ObjectId, ref: 'User'}],
    host: {type: Schema.Types.ObjectId, ref: 'User'},
    inviteToken: {type: String, required: true}
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

LobbySchema.plugin(mongoosePaginate);

export default mongoose.model('Lobby', LobbySchema);
