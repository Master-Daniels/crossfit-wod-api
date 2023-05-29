const { saveToDatabase, DB } = require("./utils");

const getAllWorkouts = () => {
    try {
        const workouts = DB.workouts;
        return workouts;
    } catch (error) {
        throw { statusCode: 500, message: error?.message || error };
    }
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
    try {
        const workout = DB.workouts.find((workout) => workout.id === workoutId);
        if (!workout) throw { statusCode: 404, message: "Workout with workoutId:" + workoutId + "not found" };
        return workout;
    } catch (error) {
        throw { statusCode: 500, message: error?.message || error };
    }
};

const updateWorkout = (workoutId, changes) => {
    try {
        const workoutIndex = DB.workout.findIndex((workout) => workout.id === workoutId);

        if (workoutIndex < 0) throw { statusCode: 404, message: "Workout with workoutId:" + workoutId + "not found" };
        if (!changes) throw { statusCode: 400, message: "No data in Request body" };

        const workoutToUpdate = {
            ...DB.workouts[workoutIndex],
            ...changes,
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        };
        DB.workouts[workoutIndex] = workoutToUpdate;
        saveToDatabase(DB);
    } catch (error) {
        throw { statusCode: 500, message: error?.message || error };
    }
};

const deleteWorkout = (workoutId) => {
    try {
        const workoutIndex = DB.workout.findIndex((workout) => workout.id === workoutId);
        if (workoutIndex < 0) throw { statusCode: 404, message: "Workout with workoutId:" + workoutId + "not found" };
        DB.workouts.splice(workoutIndex, 1);
        saveToDatabase(DB);
    } catch (error) {
        throw { statusCode: 500, message: error?.message || error };
    }

    return true;
};

module.exports = {
    getAllWorkouts,
    createNewWorkout,
    getWorkout,
    updateWorkout,
    deleteWorkout,
};
