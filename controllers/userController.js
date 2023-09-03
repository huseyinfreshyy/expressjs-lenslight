import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({
            succeded: true,
            user,
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }

}

const userDashboard = (req, res) => {
    res.render('dashboard', {
        link: 'dashboard',
    })
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        let isSame = false;

        if (user)
            isSame = await bcrypt.compare(password, user.password)
        else {
            return res.status(401).json({
                succeded: false,
                error: "There is no such a user"
            })
        }

        if (isSame) {
            const token = createToken(user._id)
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            });
            res.redirect("/users/dashboard")
        }

        else
            res.status(500).json({
                succeded: false,
                error: 'Invalid password or email'
            })

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.SECRET_TOKEN, {
        expiresIn: "1h"
    })

}

export { createUser, loginUser, userDashboard };
