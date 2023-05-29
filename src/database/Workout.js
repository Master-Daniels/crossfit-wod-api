const { saveToDatabase, DB } = require("./utils");

const getAllWorkouts = () => {
    return DB.workouts;
};

const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded = DB.workout.findIndex((workout) => workout.name === newWorkout.name) > -1;

    if (isAlreadyAdded) {
        throw {
            statusCode: 404,
            message: `Workout with the name '${newWorkout.name}' already exists`,
        };
    }

    try {
        DB.workouts.push(newWorkout);
        saveToDatabase(DB);
        return newWorkout;
    } catch (error) {
        throw { statusCode: 500, message: error?.message || error };
    }
};

const getWorkout = (workoutId) => {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);
    if (!workout) return;
    return workout;
};

const updateWorkout = (workoutId, changes) => {
    const workoutIndex = DB.workout.findIndex((workout) => workout.id === workoutId);
    if (workoutIndex < 0) return;
    const workoutToUpdate = {
        ...DB.workouts[workoutIndex],
        ...changes,
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.workouts[workoutIndex] = workoutToUpdate;
    saveToDatabase(DB);
};

const deleteWorkout = (workoutId) => {
    const workoutIndex = DB.workout.findIndex((workout) => workout.id === workoutId);
    if (workoutIndex < 0) return false;
    DB.workouts.splice(workoutIndex, 1);
    saveToDatabase(DB);
    return true;
};

module.exports = {
    getAllWorkouts,
    createNewWorkout,
    getWorkout,
    updateWorkout,
    deleteWorkout,
};
