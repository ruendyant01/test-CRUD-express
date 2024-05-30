const {response} = require("../responses/response");
const authorization = async(req,res,next) => {
    const userId = req.user;
    try {
        const user = await User.findById(userId);
        if (user.role === 'user') {
            throw {
                message: 'Unauthorized',
            }
        }
        next();
    } catch (error) {
        return res.status(401).json(response(403, error.message, null));
    }
}

module.exports = authorization;