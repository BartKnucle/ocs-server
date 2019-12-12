module.exports = (options = {}) => {
  return (context) => {
    context.app.service('/api/subnets').add(context.data.net_ip4_subnet, context.data.net_gatewayV4)
    return context
  }
}
