const mongoose = require('mongoose');
const {Schema} = mongoose;

const billingInformationSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true},
    firstName: {type: String, default: null},
    lastName: {type: String, default: null},
    birthDay: {type: Date, default: null},
    city: {type: Schema.Types.ObjectId, ref: 'City', default: null},
    state: {type: Schema.Types.ObjectId, ref: 'State', default: null},
    country: {type: Schema.Types.ObjectId, ref: 'Country', default: null},
    zipCode: {type: String, default: null},
    countryCode: {type: String, default: null},
    phoneNumber: {type: String, default: null},
    phoneNumberVerify: {type: Boolean, default: false},
    creditNumber: {type: String, default: null},
    CVV: {type: String, default: null},
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

export default mongoose.model('BillingInformation', billingInformationSchema);
