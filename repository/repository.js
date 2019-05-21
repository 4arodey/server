const { NotFoundException } = require('../exceptions/notFound.exception');

class Repository {
  constructor(scheme, selectAttrs) {
    this.scheme = scheme;
    this.selectAttrs = selectAttrs;

    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  findAll(selectAttrs) {
    const attributes = this.getAttributes(selectAttrs);

    return this.scheme.query().select.apply(this.scheme.query(), attributes);
  }

  getAttributes(selectAttrs) {
    return Array.isArray(selectAttrs) ? selectAttrs : this.selectAttrs;
  }

  findById(id, selectAttrs) {
    return this.findOne({ id }, selectAttrs);
  }

  findOne(fieldsObj) {
    return this.scheme
      .query()
      .findOne(fieldsObj);
  }

  create(entity) {
    return this.scheme.query().insert(entity);
  }

  update(id, updatedEntity) {
    return this.findById(id)
      .then(() => this.scheme.query().findById(id).update(updatedEntity));
  }

  remove(id) {
    return this
      .findById(id)
      .then(() => this.scheme.query().deleteById(id));
  }
}


module.exports = Repository;
