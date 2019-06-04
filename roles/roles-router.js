const router = require('express').Router();
const Roles = require('./roles-model');


router.get('/', (req, res) => {
  Roles.find()
  .then(roles => {
    res.status(200).json(roles);
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) => {
  // retrieve a role by id
  const {id} = req.params
  Roles.findById(id)
  .then(role => {
    if(role){
      res.status(200).json(role)
    }else{
      res.status(404).json({message: 'Role not found'})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })

});

router.post('/', (req, res) => {
  Roles.add(req.body)
  .then(ids => {
    // res.status(201).json(ids)
    res.status(201).redirect('http://localhost:5000/api/roles/')
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  const {id} = req.params
  const changes = req.body
  Roles.update(id, changes)
  .then(count => {
    if(count){
      res.status(200).redirect('http://localhost:5000/api/roles/')
    }else{
      res.status(404).json({message: 'Role not found'})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  const {id} = req.params
  Roles.remove(id)
  .then(count => {
    if(count){
      const unit = count > 1 ? 'records': 'record';
      res.status(200).json({message: `${count} ${unit} deleted`, id})
    }else{
      res.status(404).json({message: 'Role not found'})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

module.exports = router;
