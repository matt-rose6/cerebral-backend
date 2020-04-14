import {Pool} from 'pg';
import * as bcrypt from 'bcrypt';

const pool = new Pool({
    user: 'test',
    host: 'localhost',
    database: 'cerebral',
    password: 'test',
    port: 5432,
})

const login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    pool.query('SELECT * FROM users WHERE email = $1', email)
    .then(res => {
        const user = res.rows[0];
        if(!user){
            const error = new Error('A user with this email could not be found');
            //error.code = 401;
            throw error;
        }
        return bcrypt.compare(password, user.password);
    })
    .catch(err => {
        throw err;
    })
}

export {login}