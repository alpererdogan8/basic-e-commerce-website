class BaseService {
  constructor(model) {
    this.model = model
  }

  load() {
    return this.model.find()
  }

  save(objects) {
    return this.model.insertMany(objects)
  }
  async insert(object) {
    return await this.model.create(object)
  }
  async removeBy(property, value) {
    return this.model.deleteOne({ [property]: value })
  }
  async update(id, object) {
    return this.model.findByIdAndUpdate(id, object)
  }
  async find(id) {
    return this.model.findById(id)
  }
  async query(obj) {
    return await this.model.find(obj)
  }
  async findBy(property, value) {
    return this.model.findOne({ [property]: value });
  }
}

module.exports = BaseService