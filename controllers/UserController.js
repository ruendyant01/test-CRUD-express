const {checkPass} = require("../utils/bcrypt");
const {makeToken} = require("../utils/jsonToken");
const {response} = require("../responses/response");
const {User} = require("../models");

class UserController {
    static registerUser = async(req,res,next) => {
        const {email, password, role,username} = req.body;

        if(role !== 'user' && role !== 'admin'){
            return res.status(400).json({message: 'Role must be user or admin'})
        }
        try {
            const newUser = await User.create({email,password,role,username})
            res.status(201).json(response(201,"Success", newUser))
        } catch (error) {
            res.status(400).json(response(400, "Bad Request", error.message))
        }
    }

    static loginUser = async(req, res, next) => {
        const {email, password} = req.body;
        try {
            const user = await User.findOne({where:{email}})
            if(!user){
                return res.status(404).json({message: 'User not found'})
            }
            const checkP = checkPass(password, user.password);
            if(!checkP){
                return res.status(400).json({message:'Wrong Password'})
            }
            const token = makeToken({id: user.id, role: user.role});
            res.status(200).json(response(200, "Success Login", token))
        } catch (error) {
            res.status(500).json(response(500, "Internal Server Error", error.message))
        }
    }

    static deleteUser = async(req, res, next) => {
        const {id} = req.params;
        try {
            const user = await User.update(
                {is_active:false},
                {
                    where:{id}
                }
            )
            res.status(200).json(response(200, "Success Deleted", user))
        } catch (error) {
            res.status(500).json(response(500, "Internal Server Error", error.message))
        }
    }

    static updateUsername = async(req,res,next) => {
        const {id} = req.params;
        const {username} = req.body;
        try {
            const user = await User.update(
                {username},
                {
                    where:{id}
                }
            )
            res.status(200).json(response(200, "Success Updated", user))
        } catch (error) {
            res.status(500).json(response(500, "Internal Server Error", error.message))
        }
    }
}

module.exports = UserController;