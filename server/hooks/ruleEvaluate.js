module.exports = (options = {}) => {
  return (context) => {
    context.service.evaluateRule(context.result._id)
    return context
  }
}
