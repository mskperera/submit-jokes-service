
const express = require("express");
const { moderateJoke, editJoke, approveJoke, rejectJoke } = require("../controllers/joke");
const { authMiddleware } = require("../middlewares/auth");
const router = express.Router();

// Route: Fetch jokes (only accessible by the moderator)
router.get('/jokes/moderate',authMiddleware, moderateJoke);

// Route: Edit a joke's content or type
router.put('/jokes/edit/:id',authMiddleware, editJoke);

// Route: Approve a joke
router.put('/jokes/approve/:id',authMiddleware, approveJoke);

// Route: Reject a joke
router.delete('/jokes/reject/:id',authMiddleware, rejectJoke);


module.exports = router;
