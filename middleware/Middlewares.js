const JWT = require('../config/tokenManager');
const ApiResponse = require('../response/pattern');
const userModel = require("../model/userModel")

class Middlewares {

    async userMiddleware(req, res, next) {
        try {
            let { status, data, msg } = await JWT.verifyToken(req)
            if (status) {
                req.data = data
                let user = await userModel.findOne({ _id: data._id, isAdmin: false });
                if (!user) {
                    return res.json(new ApiResponse(false, null, "authentication Failed"))
                }
                next()
            } else {
                return res.json(new ApiResponse(false, null, msg))
            }
        } catch (error) {
            return res.json(new ApiResponse(false, null, error.message))
        }
    }

    async adminMiddleware(req, res, next) {
        try {
            let { status, data, msg } = await JWT.verifyToken(req)
            if (status) {
                req.data = data
                let user = await userModel.findOne({ _id: data._id, isAdmin: true });
                if (!user) {
                    return res.json(new ApiResponse(false, null, "authentication Failed"))
                }
                next()
            } else {
                return res.json(new ApiResponse(false, null, msg))
            }
        } catch (error) {
            return res.json(new ApiResponse(false, null, error.message))
        }
    }

}



module.exports = new Middlewares()