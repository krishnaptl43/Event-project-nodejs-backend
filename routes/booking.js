const express = require('express');
const { userMiddleware } = require('../middleware/Middlewares');
const { getAllBookings, bookTicket, cancelTicket } = require('../controller/bookingController');
const router = express.Router();

// get all users http://localhost:8000/api/booking/
router.get("/", userMiddleware, getAllBookings)

// get all users http://localhost:8000/api/booking/book-now
router.post("/book-now", userMiddleware, bookTicket)

// http://localhost:8000/api/booking/cancel-ticket/bookId
router.put("/cancel-ticket/:bookId", userMiddleware, cancelTicket)


module.exports = router;
