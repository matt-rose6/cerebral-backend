import {Pool} from 'pg';

const pool = new Pool({
    user: 'test',
    host: 'localhost',
    database: 'cerebral',
    password: 'test',
    port: 5432,
}) 

export {pool as Database}