const mongoose = require('mongoose');
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate');

const ShopCategorySchema = Schema({
    name: {type: String, required: true},
    parent: {type: Schema.Types.ObjectId, ref: 'ShopCategory', default: null},
    categories: [{type: Schema.Types.ObjectId, ref: 'ShopCategory', default: null}],
    image: {type: Schema.Types.ObjectId, ref: 'File'},
    description: {type: String, default: null},
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

ShopCategorySchema.plugin(mongoosePaginate);

ShopCategorySchema.virtual('parents', {
    ref: 'ShopCategory',
    localField: 'categories',
    foreignField: 'id'
});

ShopCategorySchema.virtual('childs', {
    ref: 'ShopCategory',
    localField: 'id',
    foreignField: 'categories'
});

export default mongoose.model('ShopCategory', ShopCategorySchema);
