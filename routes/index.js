var express = require('express');
var router = express.Router();

var consul = require('consul')(
  {
    host: process.env.CONSUL_HOST
  }
)

var serviceAccount = {};
var db = undefined;

/* GET home page. */
router.get('/:service/:user', function(req, res, next) {
  try {
    consul.kv.get('aethred/permissions', (err, resp) => {
      if(err) throw err;
      if (!resp.Value) console.error("unexpected error")
      let users = JSON.parse(resp.Value)[req.params.service] || {}
      let permissions = users[req.params.user] || [] 
      res.json({results: permissions})
    })
  } catch {
    res.status(500)
  }
});

module.exports = router;
