const mongoose = require('mongoose');
const {Schema} = mongoose;

const CitySchema = Schema({
    cityName: {type: String, required: true},
    state: {type: Schema.Types.ObjectId, ref: 'State', required: true},
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

export default mongoose.model('City', CitySchema);
