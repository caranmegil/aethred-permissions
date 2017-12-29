var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");

var serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aethreddb.firebaseio.com"
});

var db = admin.database()
/* GET home page. */
router.get('/:service/:user', function(req, res, next) {
  var ref = db.ref(`permissions/${req.params.service}/${req.params.user}`)
  ref.once('value', (snapshot) => {
    var userPermissions = snapshot.val()
    console.log(userPermissions)
    var permissions = Object.keys(userPermissions).filter( (k) => {return userPermissions[k]} )
    res.json({results: permissions})
  })
});

router.post('/:service/:user', function(req, res, next) {
  var ref = db.ref(`permissions/${req.params.service}/${req.params.user}`)

  var userPermissions = {}
  req.body.permissions.forEach( (k) => {
    userPermissions[k] = true
  })

  ref.update(userPermissions)
  res.json({permissions: req.body.permissions})
});

router.delete('/:service/:user', function(req, res, next) {
  var ref = db.ref(`permissions/${req.params.service}/${req.params.user}`)

  var userPermissions = {}
  req.body.permissions.forEach( (k) => {
    userPermissions[k] = false
  })

  ref.update(userPermissions)
  res.json({permissions: req.body.permissions})
});

module.exports = router;