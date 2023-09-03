import express from "express"
import * as pageController from '../controllers/pageController.js';
import * as authToken from '../middlewares/auth.jwt.js';

const router = express.Router();

router.route('/').get(authToken.authenticateToken, pageController.getIndexPage)
router.route('/about').get(pageController.getAboutPage)
router.route('/register').get(pageController.getRegisterPage)
router.route('/login').get(pageController.getLoginPage)

export default router;

