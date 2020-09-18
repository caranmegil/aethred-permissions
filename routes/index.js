var express = require('express');
var router = express.Router();
var fs = require('fs');

var users = {}

setInterval( () => {
  let rawdata = fs.readFileSync(process.env.PERM_FILE)
  userPermissions = JSON.parse(rawdata) || {}
},10000)

/* GET home page. */
router.get('/:service/:user', function(req, res, next) {
  try {
    users = userPermissions[req.params.service] || {}
    let permissions = users[req.params.user] || [] 
    res.json({results: permissions})
  } catch {
    res.status(500)
  }
});

module.exports = router;
