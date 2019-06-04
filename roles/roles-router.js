const router = require('express').Router();
const knex = require('knex');
const Roles = require('./roles-model');

// install knex and sqlite3
// configure knex and get a connection to db
const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/roles.db3'
  },
  useNullAsDefault: true, // required for sqlite3
  // debug: true, // console logs the SQL query
}

const db = knex(knexConfig);

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
  db('roles')
  .insert(req.body, 'id')
  .then(ids => {
    res.status(201).json(ids)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update roles
  db('roles').where({id: req.params.id}).update(req.body)
  .then(count => {
    if(count){
      res.status(200).json({message: `${count} records updated`})
    }else{
      res.status(404).json({message: 'Role not found'})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // remove roles (inactivate the role)
  db('roles').where({id: req.params.id}).delete()
  .then(count => {
    if(count){
      const unit = count > 1 ? 'records': 'record';
      res.status(200).json({message: `${count} ${unit} deleted`})
    }else{
      res.status(404).json({message: 'Role not found'})
    }
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

module.exports = router;
