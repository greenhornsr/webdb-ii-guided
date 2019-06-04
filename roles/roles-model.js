const knex = require('knex');

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
async function add(role){
    const [id] = await db('roles').insert(role, 'id')

    return findById(id)
}
function update(id, changes){
    return db('roles')
    .where({id})
    .update(changes, '*')
}
function remove(id){
    return db('roles')
    .where({id})
    .del();
}


