/**
 * Created by Linh Ngô on 12/07/17.
 */
//======CONNECT TO POSTGRESQL DATABASE======

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'test_product',
  user: 'postgres',
  password: 'abc',
};

const pgp = require('pg-promise')();

module.exports = pgp(cn);
