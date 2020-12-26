const router = require('express').Router();
let SubTodo = require('../models/sub.model');

router.route('/').get((req, res) => {
  SubTodo.find()
    .then(subTodos => res.json(subTodos))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  SubTodo.findByIdAndDelete(req.params.id)
    .then(() => res.json('Sub deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const parentName = req.body.parentName;

  const newSubTodo = new SubTodo({name: name, parentName: parentName});

  newSubTodo.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;