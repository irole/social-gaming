const mongoose = require('mongoose');
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate');

const permissionSchema = Schema({
    name: {type: String, required: true},
    group: {type: String, required: true},
    label: {type: String, required: true},
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

permissionSchema.plugin(mongoosePaginate);

export default mongoose.model('Permission', permissionSchema);
