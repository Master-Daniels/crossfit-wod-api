const { saveToDatabase, DB } = require("./utils");

/**
 * @openapi
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name: 
 *           type: string
 *           example: Tommy V  
 *         mode:
 *           type: string
 *           example: For Time
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt: 
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */

const getAllWorkouts = (filterParams) => {
    try {
        let workouts = DB.workouts;
        if (filterParams.mode) {
            workouts = workouts.filter((workout) =>
                workout.mode.toLowerCase().includes(filterParams.mode.toLowerCase())
            );
        }
        if (filterParams.length) {
            const end = Number(filterParams.length);
            workouts = workouts.slice(0, end);
        }
        return workouts;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;

    if (isAlreadyAdded) {
        throw {
            status: 404,
            message: `Workout with the name '${newWorkout.name}' already exists`,
        };
    }

    try {
        DB.workouts.push(newWorkout);
        saveToDatabase(DB);
        return newWorkout;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const getWorkout = (workoutId) => {
    try {
        const workout = DB.workouts.find((workout) => workout.id === workoutId);
        if (!workout) throw { status: 400, message: "Workout with workoutId {" + workoutId + "} not found" };
        return workout;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const updateWorkout = (workoutId, changes) => {
    try {
        if (!changes) throw { statusCode: 400, message: "No data in Request body" };

        const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === changes.name) > -1;
        if (isAlreadyAdded)
            throw { status: 400, message: "Workout with the name '" + changes.name + "' already exists." };

        const workoutIndex = DB.workouts.findIndex((workout) => workout.id === workoutId);
        if (workoutIndex < 0) throw { status: 404, message: "Workout with workoutId: '" + workoutId + "' not found" };

        const workoutToUpdate = {
            ...DB.workouts[workoutIndex],
            ...changes,
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        };
        DB.workouts[workoutIndex] = workoutToUpdate;
        saveToDatabase(DB);
        return workoutToUpdate;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const deleteWorkout = (workoutId) => {
    try {
        const workoutIndex = DB.workouts.findIndex((workout) => workout.id === workoutId);
        if (workoutIndex < 0) throw { statusCode: 400, message: "Workout with workoutId:" + workoutId + "not found" };
        DB.workouts.splice(workoutIndex, 1);
        saveToDatabase(DB);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
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
