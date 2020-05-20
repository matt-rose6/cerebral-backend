import { Database } from './dbService';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const login = (request, response) => {
  const email = request.body.email;
  const password = request.body.pass;
  Database.query(
    'SELECT * FROM users WHERE email = $1',
    [email],
    (error, res) => {
      if (error) throw error;
      const user = res.rows[0];
      if (!user) {
        response.json({
          success: false,
          token: null,
          err: 'Account with this email cannot be found',
        });
      }
      else {
        bcrypt.compare(password, user.pass, function(err, res) {
          if(res===true){
            let token = jwt.sign(
              { uid: user.uid, username: user.username },
              ACCESS_TOKEN_SECRET,
              { expiresIn:  129600 }
            ); // Sigining the token
            response.json({
              success: true,
              err: null,
              token: token,
              user: user,
            });
          }
          else {
            response.json({
              success: false,
              token: null,
              err: 'Password is incorrect',
            })
          }
        })
      }
    }
  );
};

const verifyToken = (req, res) => {
  jwt.verify(req.body.token, ACCESS_TOKEN_SECRET, (err) => {
    if (err) res.json({
      success: false,
      error: 'Could not validate the token'
    })
    else res.json({
      success: true
    });
  });
};

const authenticateHeader = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

export { login, verifyToken, authenticateHeader }; //authenticateJWT
