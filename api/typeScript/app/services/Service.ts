// Packages
const autoBind = require('auto-bind');

export default class Service {

    model: any;

    constructor(model) {
        this.model = model;
        autoBind(this);
    }

    // Find
    async find(where, populate: any = null, sort = {createdAt: 1}) {
        return await this.model.find(where).populate(populate).sort(sort).exec();
    }

    async findOne(where = {}, populate: any = null, sort = {createdAt: 1}) {
        return await this.model.findOne(where).populate(populate).sort(sort).exec();
    }

    async findAll() {
        return this.model.find({});
    }

    async findById(id: any, populate: any = null) {
        return await this.model.findById(id).populate(populate).exec();
    }

    // Find & Update
    async findByIdAndUpdate(id: any, update: object) {
        return await this.model.findByIdAndUpdate(id, update);
    }

    async findOneAndUpdate(where: object, update: object) {
        return await this.model.findOneAndUpdate(where, update);
    }

    async findOneAndDelete(where) {
        return await this.model.findOneAndDelete(where);
    }

    // Remove
    async remove(id) {
        await this.model.findByIdAndDelete(id);
    }


    async findByIdAndDelete(id) {
        return await this.model.findByIdAndDelete(id);
    }

    // Insert
    async insert(values: object) {
        let newModel = await new this.model(values);
        return await newModel.save();
    }

    async insertWithoutSave(values: object) {
        return await new this.model(values);
    }

    async insertMany(values) {
        return await this.model.insertMany(values);
    }

    // Paginate
    async paginate(where = {}, page, sort = {createdAt: 1}, limit = 10, populate: any = null) {
        return await this.model.paginate(where, {page, sort, limit, populate});
    }

}
