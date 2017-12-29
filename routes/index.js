var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");

var serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aethreddb.firebaseio.com"
});

/* GET home page. */
router.get('/:service/:user', function(req, res, next) {
  var db = admin.database()
  var ref = db.ref('permissions')
  ref.child(req.params.service).child(req.params.user).on('value', (snapshot) => {
    var userPermissions = snapshot.val()
    var permissions = Object.keys(userPermissions).filter( (k, v) => {return !v} )
    res.json({results: permissions})
  })
});

router.post('/:service/:user', function(req, res, next) {
  var db = admin.database()
  var ref = db.ref(`permissions/${req.params.service}/${req.params.user}`)

  var userPermissions = {}
  req.body.permissions.forEach( (k) => {
    userPermissions[k] = true
  })

  ref.update(userPermissions)
  res.json({permissions: req.body.permissions})
});

router.delete('/:service/:user', function(req, res, next) {
  var db = admin.database()
  var ref = db.ref(`permissions/${req.params.service}/${req.params.user}`)

  var userPermissions = {}
  req.body.permissions.forEach( (k) => {
    userPermissions[k] = false
  })

  ref.update(userPermissions)
  res.json({permissions: req.body.permissions})
});

module.exports = router;
