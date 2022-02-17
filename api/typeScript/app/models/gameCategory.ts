const mongoose = require('mongoose');
const {Schema} = mongoose;
const mongoosePaginate = require('mongoose-paginate');

const GameCategorySchema = Schema({
    name: {type: String, required: true},
    parent: {type: Schema.Types.ObjectId, ref: 'GameCategory', default: null},
    categories: [{type: Schema.Types.ObjectId, ref: 'GameCategory', default: null}],
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

GameCategorySchema.plugin(mongoosePaginate);

GameCategorySchema.virtual('parents', {
    ref: 'GameCategory',
    localField: 'categories',
    foreignField: 'id'
});

GameCategorySchema.virtual('childs', {
    ref: 'GameCategory',
    localField: 'id',
    foreignField: 'categories'
});

export default mongoose.model('GameCategory', GameCategorySchema);
