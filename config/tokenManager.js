const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.TOKEN_SECRET;
const expire_time = process.env.TOKEN_EXPIRE;

class JWT {

    constructor(secret, expire_time) {
        this.secret = secret;
        this.expire_time = expire_time;
    }

    genarateToken(data) {
        try {
            let token = jwt.sign(data, this.secret, { expiresIn: this.expire_time })
            return token
        } catch (error) {
            console.log(error);
        }
    }

    verifyToken(req) {
        return new Promise((resolve, reject) => {
            let headers = req && req.headers
            let token = headers && headers['authorization']?.split(" ")[1]
            if (!token) {
                resolve({ status: false, msg: "token not found" })
            }
            try {
                let data = jwt.verify(token, this.secret, (err, data) => {
                    if (err) {
                        resolve({ status: false, msg: "Invalid or Expire Token" })
                    }
                    return data
                })
                resolve({ status: true, data })
            } catch (error) {
                console.log(error);

            }
        })
    }
}

module.exports = new JWT(secret, expire_time);