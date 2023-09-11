import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Photo from "../models/photoModel.js";


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: res.locals.user._id } })
        res.status(200).render("users", { users, link: "users" })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }

}

const follow = async (req, res) => {
    try {

        let user = await User.findByIdAndUpdate(
            { _id: req.params.id },
            { $push: { followers: res.locals.user._id } },
            { new: true }
        )

        user = await User.findByIdAndUpdate(
            { _id: res.locals.user._id },
            { $push: { followings: req.params.id } },
            { new: true }
        )

        res.status(200).redirect(`/users/${req.params.id}`)

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }

}

const unFollow = async (req, res) => {
    try {

        let user = await User.findByIdAndUpdate(
            { _id: req.params.id },
            { $pull: { followers: res.locals.user._id } },
            { new: true }
        )

        user = await User.findByIdAndUpdate(
            { _id: res.locals.user._id },
            { $pull: { followings: req.params.id } },
            { new: true }
        )

        res.status(200).redirect(`/users/${req.params.id}`)

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }

}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id }).populate(['followings', 'followers'])

        const isFollower = user.followers.some((f) => {
            return f.equals(res.locals.user._id)
        })

        const photos = await Photo.find({ user: user._id })
        res.status(200).render("user", { user, photos, isFollower, link: "users" })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }

}
const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({
            user: user._id,
        })
    } catch (error) {
        let err = {}

        if (error.code === 11000) {
            err.both = 'Email or Username already exists'
        }

        if (error.name === "ValidationError") {
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message
            })
        }

        res.status(400).json(err)
    }

}

const userDashboard = async (req, res) => {
    const photos = await Photo.find({
        user: res.locals.user._id
    })
    const user = await User.findById({ _id: res.locals.user._id }).populate(['followings', 'followers'])
    res.render('dashboard', {
        photos,
        user,
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
            res.status(401).json({
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
        } else {
            res.status(401).json({
                succeded: false,
                error: 'Invalid password or email'
            })
        }


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

export { createUser, loginUser, userDashboard, getAllUsers, getUserById, follow, unFollow };
