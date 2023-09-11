import express from "express"
import * as pageController from '../controllers/pageController.js';
import * as authToken from '../middlewares/auth.jwt.js';

const router = express.Router();

router.route('/').get(pageController.getIndexPage)
router.route('/about').get(pageController.getAboutPage)
router.route('/contact').get(pageController.getContactPage)
router.route('/contact').post(pageController.sendMail)
router.route('/register').get(pageController.getRegisterPage)
router.route('/login').get(pageController.getLoginPage)
router.route('/logout').get(pageController.getLogout)


export default router;

