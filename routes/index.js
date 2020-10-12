/*

index.js - route responsible for pulling permissions
Copyright (C) 2020  William R. Moore <caranmegil@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

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
