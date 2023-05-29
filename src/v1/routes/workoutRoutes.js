const express = require("express");
const workoutContoller = require("../../controllers/workoutController");
const recordController = require("../../controllers/recordController");

const router = express.Router();

router.get("/", workoutContoller.getAllWorkouts);
router.get("/:workoutId", workoutContoller.getWorkout);
router.get("/:workoutId/records", recordController.getRecordWorkouts);

router.post("/", workoutContoller.createWorkout);
router.patch("/:workoutId", workoutContoller.updateWorkout);
router.delete("/:workoutId", workoutContoller.deleteWorkout);

module.exports = router;
