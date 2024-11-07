const express = require("express");
const {
  submitJoke,
  updateJoke,
  getNewJoke,
  approveJoke,
  rejectJoke,
  getJokeTypes,
  getAllJokes,
  getAllSubmittedJokes,
} = require("../controllers/joke");
const { authMiddleware } = require("../middlewares/auth");
const router = express.Router();

router.get("/jokes/allSubmittedJokes", authMiddleware, getAllSubmittedJokes);

router.get("/jokes/newJoke", authMiddleware, getNewJoke);

router.put("/jokes/update/:id", authMiddleware, updateJoke);

router.put("/jokes/approve/:id", authMiddleware, approveJoke);

router.delete("/jokes/reject/:id", authMiddleware, rejectJoke);

router.post("/jokes/submit", submitJoke);

router.get("/jokes/types", getJokeTypes);

module.exports = router;
