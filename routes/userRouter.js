import express from "express"
import * as userController from '../controllers/userController.js';
import * as auth from '../middlewares/auth.jwt.js'

const router = express.Router();

router.route('/register').post(userController.createUser)
router.route('/login').post(userController.loginUser)
router.route('/dashboard').get(auth.authenticateToken, userController.userDashboard)
router.route('/').get(auth.authenticateToken, userController.getAllUsers)
router.route('/:id').get(auth.authenticateToken, userController.getUserById)

export default router;

