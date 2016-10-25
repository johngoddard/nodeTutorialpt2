var express = require('express');
var router = express.Router();

router.get('/userlist', (req, res) => {
  var db = req.db;
  var collection = db.get('userlist');
  collection.find({}, (e, docs) => {
    res.json(docs);
  });
});

router.post('/addUser', (req, res) => {
  var db = req.db;
  var collection = db.get('userlist');
  collection.insert(req.body, (err, result) => {
    res.send(
      err === null ? {msg: ''} : {msg: err}
    );
  });
});

router.delete('/deleteuser/:id', (req, res) => {
  var db = req.db;
  var collection = db.get('userlist');
  let userToDelete = req.params.id;
  collection.remove({'_id': userToDelete}, err => {
    res.send((err === null) ? {msg: ''} : {msg: `error: ${err}`});
  });
});

module.exports = router;
