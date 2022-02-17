const mongoose = require('mongoose');
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate');

const roleSchema = Schema({
    name: {type: String, required: true},
    label: {type: String, required: true},
    lang: {type: String, required: true},
    permissions: [{type: Schema.Types.ObjectId, ref: 'Permission'}]
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

roleSchema.plugin(mongoosePaginate);


export default mongoose.model('Role', roleSchema);
