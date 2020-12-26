const router = require('express').Router();
let ToDo = require('../models/todo.model');

router.route('/').get((req, res) => {
  ToDo.find()
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req, res) => {
  ToDo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const isdone = Boolean(req.body.isdone);
  const date = Date.parse(req.body.date);
  const parentId = req.body.parentId;

  const newToDo = new ToDo({
    name,
    description,
    isdone,
    date,
    parentId,
  });

  newToDo.save()
  .then(() => res.json('Todo added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
  
router.route('/:id').delete((req, res) => {
  ToDo.findByIdAndDelete(req.params.id)
    .then(() => res.json('ToDo deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  ToDo.findById(req.params.id)
    .then(todo => {
      todo.name = req.body.name;
      todo.description = req.body.description;
      todo.isdone = Boolean(req.body.isdone);
      todo.date = Date.parse(req.body.date);
      todo.parentId = req.body.parentId;

      todo.save()
        .then(() => res.json('ToDo updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
  
module.exports = router;