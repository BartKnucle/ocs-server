const createModel = require('../../models/devices.model')
const { Devices } = require('./devices.class')
const hooks = require('./devices.hooks')

module.exports = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true
  }

  app.use('/devices', new Devices(options, app))
  const service = app.service('devices')

  service.hooks(hooks)
}
