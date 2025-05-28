const express = require('express');
const { getUserById, uploadProfile } = require('../controller/userController');
const { adminMiddleware } = require('../middleware/Middlewares');
const { adminLogin } = require('../controller/adminController');
const upload = require("../config/multer")
const router = express.Router();

// get all users http://localhost:8000/api/admin
router.get("/", adminMiddleware, getUserById)

// http://localhost:8000/api/admin/login
router.post("/login", adminLogin)

// http://localhost:8000/api/admin/upload-profile
router.put("/upload-profile", adminMiddleware, upload.single("profile") , uploadProfile)


module.exports = router;
