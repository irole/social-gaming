const mongoose = require('mongoose');
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate');

const ArticleSchema = Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    slug: {type: String, required: true},
    body: {type: String, required: true},
    image: {type: Schema.Types.ObjectId, ref: 'File'},
    tags: {type: String, default: null},
    categories: [{type: Schema.Types.ObjectId, ref: 'ShopCategory'}],
    viewCount: {type: Number, default: 0},
    likeCount: {type: Number, default: 0},
    disLikeCount: {type: Number, default: 0},
    lang: {type: String, required: true},
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

ArticleSchema.plugin(mongoosePaginate);


ArticleSchema.methods.path = function () {
    return `/articles/${this.slug}`;
}

ArticleSchema.methods.inc = async function (field: any, num = 1) {
    this[field] += num;
    await this.save();
}

ArticleSchema.methods.dec = async function (field: any, num = 1) {
    if (this[field] > 0) this[field] -= num;
    await this.save();
}


export default mongoose.model('Article', ArticleSchema);
