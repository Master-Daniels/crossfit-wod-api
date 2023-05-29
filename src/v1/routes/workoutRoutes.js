const express = require("express");
const workoutContoller = require("../../controllers/workoutController");

const router = express.Router();
router.route("/");

router.get("/", workoutContoller.getAllWorkouts);
router.get("/:workoutId", workoutContoller.getWorkout);
router.post("/", workoutContoller.createWorkout);
router.patch("/:workoutId", workoutContoller.updateWorkout);
router.delete("/:workoutId", workoutContoller.deleteWorkout);


module.exports = router;
