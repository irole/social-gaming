const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');
const mongoosePaginate = require('mongoose-paginate');
const config = require('config');


const userSchema = Schema({
    email: {type: String, unique: true, required: true},
    emailVerify: {type: Boolean, default: false},
    password: {type: String, required: true},
    username: {type: String, unique: true},
    isGuest: {type: Boolean, default: false},
    whenUserCanUpdateUsername: {type: Date, default: new Date().getMonth() - 1},
    countryCode: {type: Schema.Types.ObjectId, ref: 'Country', default: null},
    phoneNumber: {type: String, default: null},
    phoneNumberVerify: {type: Boolean, default: false},
    biography: {type: String, default: null},
    profilePicture: {type: String, default: null},
    firstName: {type: String, default: null},
    lastName: {type: String, default: null},
    gender: {type: String, default: null},
    birthDay: {type: Date, default: null},
    generalLevel: {type: Number, default: 1},
    generalXP: {type: Number, default: 0},
    neededXP: {type: Number, default: 1000},
    nowActivity: {type: String},
    banStatus: {type: Boolean, default: false},
    banTime: {type: Date, default: null},
    banModel: {type: String, default: null},
    admin: {type: Boolean, default: false},
    role: {type: Schema.Types.ObjectId, ref: 'Role', default: null},
}, {
    timestamps: true, toJSON: {
        transform(doc: any, ret: any) {
            ret.id = ret._id
            delete ret._id;
            delete ret.password;
        },
        virtuals: true,
        versionKey: false // __v : 0
    }
});

userSchema.plugin(mongoosePaginate);

userSchema.methods.comparePassword = function (password: any) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.setRememberToken = function (res) {
    const token = uniqueString();
    res.cookie('remember_token', token, {maxAge: 1000 * 60 * 60 * 24 * 90, httpOnly: true, signed: true});
    this.update({rememberToken: token}, (err: any) => {
        if (err) console.log(err);
    });
};

userSchema.methods.isOwner = async function () {
    let user = await this.populate('role');
    return user.role.name == 'Owner';
}

userSchema.methods.imageUrl = function () {
    return config.WebsiteUrl + config.ApplicationPort + this.profilePicture;
}

userSchema.virtual('PrivacySetting', {
    ref: 'PrivacySetting',
    localField: 'id',
    foreignField: 'user'
});
userSchema.virtual('notificationSetting', {
    ref: 'NotificationSetting',
    localField: 'id',
    foreignField: 'user'
});
userSchema.virtual('billingInformation', {
    ref: 'BillingInformation',
    localField: 'id',
    foreignField: 'user'
});
userSchema.virtual('userRelationship', {
    ref: 'UserRelationship',
    localField: 'id',
    foreignField: 'user'
});

export default mongoose.model('User', userSchema);
