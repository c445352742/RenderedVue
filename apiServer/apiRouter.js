const router = require('express').Router();

module.exports = function (db) {
  router.get('/', function (req, res, next) {
    res.send({ a: db.data.maxId, b: 'sdfawfe1' });
  })
  return router;
};