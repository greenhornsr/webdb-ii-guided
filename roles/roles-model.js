const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/roles.db3'
    },
    useNullAsDefault: true, // required for sqlite3
    // debug: true, // console logs the SQL query
}

const db = knex(knexConfig);

module.exports = {
    find, 
    findById,
    add,
    update,
    remove
}

function find(){
    return db('roles')
}
function findById(id){
    return db('roles').where({id})
    .first()
}
function add(role){
    return null
}
function update(id, changes){
    return null
}
function remove(id){
    return null
}


