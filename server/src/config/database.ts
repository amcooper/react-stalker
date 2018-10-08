//const database = require("../knexfile")[process.env.NODE_ENV];
//const knex = require("knex")(database);

import knexBase from "knex";
import knexfile = require("../knexfile");

const database = knexfile[process.env.NODE_ENV];
const knex = knexBase(database);

export default knex;
