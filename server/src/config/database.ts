const database: Object = require("../knexfile")[process.env.NODE_ENV];
const knex = require("knex")(database);

export default knex; 