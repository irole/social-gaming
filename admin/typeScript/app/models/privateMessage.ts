const mongoose = require('mongoose');
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate');

const privateMessage = Schema({
    endPointOne: {type: Schema.Types.ObjectId, ref: 'User'},
    endPointTwo: {type: Schema.Types.ObjectId, ref: 'User'},
    messageHistory:
        [{
            sender: {type: Schema.Types.ObjectId, ref: 'User'},
            message: {type: String, default: null},
            time: {type: Date, default: null},
            read: {type: Boolean, default: false}
        }]
    ,
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

privateMessage.plugin(mongoosePaginate);

export default mongoose.model('PrivateMessage', privateMessage);
