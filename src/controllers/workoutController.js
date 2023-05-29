const workoutService = require("../services/workoutService");

function getAllWorkouts(req, res) {
    const workouts = workoutService.getAllWorkouts();
    res.status(200).send({ message: "OK", data: workouts });
}

function getWorkout(req, res) {
    const workout = workoutService.getWorkout(req.params.workoutId);
    if (!workout) return res.status(404).send({ message: "No workout found for this ID" });
    res.status(200).send({ message: "OK", data: workout });
}

function createWorkout(req, res) {
    const { name, mode, equipment, exercises, trainerTips } = req.body;
    if (!name || !mode || !equipment || !exercises || !trainerTips)
        return res.status(400).send({ message: "Invalid Params." });

    const createdWorkout = workoutService.createWorkout({ name, mode, equipment, exercises, trainerTips });
    res.status(201).send({ message: "Created", data: createdWorkout });
}

function updateWorkout(req, res) {
    const updatedWorkout = workoutService.updateWorkout();
    res.send(`Update an existing workout`);
}

function deleteWorkout(req, res) {
    workoutService.deleteWorkout();
    res.status(204).send("Delete an existing workout");
}

module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
};
