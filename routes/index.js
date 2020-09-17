var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/:service/:user', function(req, res, next) {
  try {
    z
    let rawdata = fs.readFileSync(process.env.PERM_FILE)
    let users = JSON.parse(rawdata)[req.params.service] || {}
    let permissions = users[req.params.user] || [] 
    res.json({results: permissions})
  } catch {
    res.status(500)
  }
});

module.exports = router;
