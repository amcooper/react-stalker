import knexObject from "../knexfile";
import knexFn from "knex";

const database = knexObject[process.env.NODE_ENV];

export default knexFn(database);