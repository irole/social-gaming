const mongoose = require('mongoose');
const {Schema} = mongoose;

const badWordSchema = Schema({
    name: {type: String, required: true},
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

export default mongoose.model('BadWord', badWordSchema);
