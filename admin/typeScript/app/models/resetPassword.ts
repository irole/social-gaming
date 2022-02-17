const mongoose = require('mongoose');
const {Schema} = mongoose;

const resetPassword = Schema({
    email: {type: String, require: true},
    token: {type: String, require: true},
    use: {type: Boolean, default: false}
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

export default mongoose.model('resetPassword', resetPassword);
