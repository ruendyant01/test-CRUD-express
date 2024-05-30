const { checkToken } = require("../utils/jsonToken");
const {User} = require("../models");
const {response} = require("../responses/response");

const auth = async(req,res,next) => {
    const {access_token} = req.headers;
    try {
        if(!access_token) throw {name:"Invalid token"}
        const token = checkToken(access_token);
        const user = await User.findByPk(token.id);
        if(!user) throw {name:"Invalid token"}
        req.user = user.id;
        next();
    } catch (error) {
        res.status(403).json(response(403, "Forbidden", error.message))
    }
}

module.exports = auth;