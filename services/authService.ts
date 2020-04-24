import {Database} from './dbService';
import * as jwt from 'jsonwebtoken';
//import * as bcrypt from 'bcrypt';

const ACCESS_TOKEN_SECRET = 'secretkey'

const login = (request, response) => { 
    const email = request.body.email;
    const password = request.body.pass;
    Database.query('SELECT * FROM users WHERE email = $1', [email], (error, res) => {
        if(error) throw error;
        const user = res.rows[0]
        if(!user){
            response.json({  //status(401) ?
                success: false,
                token: null,
                err: 'User with this email cannot be found'
            });
        }
        //if (bcrypt.compare(password, user.password)) {
        else if(password === user.pass) {
            let token = jwt.sign({ uid: user.uid, username: user.username }, ACCESS_TOKEN_SECRET, { expiresIn: 129600 }); // Sigining the token
            response.json({
                success: true,
                err: null,
                token: token,
                user: user
            });
        } else {
            // response.status(401).json({
            response.json({
                success: false,
                token: null,
                err: 'Username or password is incorrect'
            });
        }
    })
}

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

export {login, authenticateJWT}