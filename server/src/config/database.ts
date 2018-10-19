import knexObject from "../knexfile";

const database = knexObject[process.env.NODE_ENV];
const knex = require("knex")(database);

export default knex; 