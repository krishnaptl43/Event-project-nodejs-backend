const express = require('express');
const { userRegister, userLogin, getUserById, uploadProfile } = require('../controller/userController');
const { userMiddleware } = require('../middleware/Middlewares');
const upload = require('../config/multer');
const router = express.Router();

// get all users http://localhost:8000/api/users
router.get("/", userMiddleware, getUserById)

// http://localhost:8000/api/users/register
router.post("/register", userRegister)

// http://localhost:8000/api/users/login
router.post("/login", userLogin)

// http://localhost:8000/api/users/upload-profile
router.put("/upload-profile", userMiddleware, upload.single("profile"), uploadProfile)


module.exports = router;
