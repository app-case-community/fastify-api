module.exports = class BaseService {

    constructor(model) {
        this.model = model
    }

    create(obj) {
        return this.model.create(obj)
    }

    count(where = {}) {
        return this.model.count(where)
    }

    findOrCreate(where) {
        return this.model.findOrCreate(where)
    }

    findById(id) {
        return this.model.findByPk(id)
    }

    findByPk(id) {
        return this.model.findByPk(id)
    }

    findOne(where) {
        return this.model.findOne(where)
    }

    findAndCountAll(where) {
        return this.model.findAndCountAll(where)
    }

    findAll(where = {}) {
        return this.model.findAll(where)
    }

}