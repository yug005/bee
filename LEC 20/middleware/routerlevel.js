function m5(req, res, next) {
  console.log('running Middleware 5');
  next();
}

module.exports.m5= m5;