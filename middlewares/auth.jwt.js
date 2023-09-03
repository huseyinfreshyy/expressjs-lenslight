import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]

        const token = authHeader && authHeader.split(" ")[1]
        if (!token)
            return res.status(401).json({
                succeded: false,
                message: 'No Token provided'
            })

        const currentUserId = jwt.verify(token, process.env.SECRET_TOKEN).userId

        req.user = await User.findById(currentUserId)

        next()
    } catch (error) {
        res.status(401).json({
            succeded: false,
            message: 'Invalid Token',
        })
    }

}

export { authenticateToken };
