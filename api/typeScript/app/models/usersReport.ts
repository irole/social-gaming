const mongoose = require('mongoose');
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate');

const userReportSchema = Schema({
    reporter: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    reportedUser: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    reportBody: {type: String, default: null}
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

userReportSchema.plugin(mongoosePaginate);

export default mongoose.model('UsersReport', userReportSchema);
