var express = require('express');
var router = express.Router();

router.get('/userlist', (req, res) => {
  var db = req.db;
  var collection = db.get('userlist');
  collection.find({}, (e, docs) => {
    res.json(docs);
  });
});

module.exports = router;
