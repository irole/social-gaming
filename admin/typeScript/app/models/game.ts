const mongoose = require('mongoose');
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate');

const gameSchema = Schema({
    name: {type: String, required: true},
    icon: {type: Schema.Types.ObjectId, ref: 'File', required: true},
    banner: {type: Schema.Types.ObjectId, ref: 'File', required: true},
    pictureGallery: [{type: Schema.Types.ObjectId, ref: 'File', required: true}],
    videoTrailer: {type: Schema.Types.ObjectId, ref: 'File', required: false},
    videoGallery: [{type: Schema.Types.ObjectId, ref: 'File', required: false}],
    description: {type: String, required: true},
    releaseDate: {type: Date, required: true},
    vipMode: {type: Boolean, required: true, default: false},
    genre: [{type: Schema.Types.ObjectId, ref: 'GameCategory', required: true}],
    developer: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    supportedLanguages: [{type: String, required: true}], ////
    esrb: {type: Schema.Types.ObjectId, ref: 'File', required: true},
    maxPlayers: {type: Number, required: true},
    supportedDevices: {type: String, required: true},////
    availableRegion: {type: String, required: true}, ////
    price: {type: String, required: true},////
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

gameSchema.plugin(mongoosePaginate);

export default mongoose.model('Game', gameSchema);
