const dataChanged = require('../../hooks/dataChanged')
const ruleEvaluate = require('../../hooks/ruleEvaluate')
const ruleDelete = require('../../hooks/ruleDelete')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [dataChanged()],
    patch: [dataChanged()],
    remove: [ruleDelete()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [ruleEvaluate()],
    update: [ruleEvaluate()],
    patch: [ruleEvaluate()],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
