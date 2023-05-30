const { v4: uuid } = require("uuid");
const Workout = require("../database/Workout");

const getAllWorkouts = (filterParams) => {
    try {
        const allWorkouts = Workout.getAllWorkouts(filterParams);
        return allWorkouts;
    } catch (error) {
        throw error;
    }
};

const getWorkout = (id) => {
    try {
        const workout = Workout.getWorkout(id);
        return [workout];
    } catch (error) {
        throw error;
    }
};

const createWorkout = (newWorkout) => {
    const workoutToInsert = {
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        ...newWorkout,
    };
    try {
        const createdWorkout = Workout.createNewWorkout(workoutToInsert);
        return [createdWorkout];
    } catch (error) {
        throw error;
    }
};

const updateWorkout = (id, changes) => {
    try {
        const updatedWorkout = Workout.updateWorkout(id, changes);
        return [updatedWorkout];
    } catch (error) {
        throw error;
    }
};

const deleteWorkout = (id) => {
    try {
        Workout.deleteWorkout(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
};
