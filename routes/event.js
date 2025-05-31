const express = require('express');
const { adminMiddleware } = require('../middleware/Middlewares');
const { getAllEvents, createEvent, cancelEvent, deleteEvent, editEvent, getMyEvents } = require('../controller/eventController');
const multer = require('multer');
const {storage,profileFiter} = require("../config/multer")
const router = express.Router();

const upload = multer({ storage, fileFilter: profileFiter, limits: { fileSize: 1024 * 1024 } });


// http://localhost:8000/api/event/
router.get("/", getAllEvents)

// http://localhost:8000/api/event/create
router.post("/create", adminMiddleware, upload.single("thumbnail"), createEvent)

// http://localhost:8000/api/event/cancel/:eventId
router.put("/cancel/:eventId", adminMiddleware, cancelEvent)

// http://localhost:8000/api/event/delete/:eventId
router.put("/delete/:eventId", adminMiddleware, deleteEvent)

// http://localhost:8000/api/event/delete/:eventId
router.put("/edit/:eventId", adminMiddleware, editEvent)

// http://localhost:8000/api/event/my-events
router.get("/my-events", adminMiddleware, getMyEvents)


module.exports = router;
