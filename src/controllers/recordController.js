const recordService = require("../services/recordService");

function getRecordWorkouts(req, res) {
    const { workoutId } = req.params;
    try {
        const workouts = recordService.getRecordForWorkout(workoutId);
        res.status(200).send({ status: "OK", length: workouts.length, data: workouts });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

module.exports = {
    getRecordWorkouts,
};
