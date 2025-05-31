const express = require('express');
const { getUserById, uploadProfile } = require('../controller/userController');
const { adminMiddleware } = require('../middleware/Middlewares');
const { adminLogin } = require('../controller/adminController');
const {storage,profileFiter} = require("../config/multer");
const multer = require('multer');
const router = express.Router();

const upload = multer({storage,fileFilter : profileFiter,limits : { fileSize : 1024 * 1024 }});


// get all users http://localhost:8000/api/admin
router.get("/", adminMiddleware, getUserById)

// http://localhost:8000/api/admin/login
router.post("/login", adminLogin)

// http://localhost:8000/api/admin/upload-profile
router.put("/upload-profile", adminMiddleware, upload.single("profile") , uploadProfile)


module.exports = router;
