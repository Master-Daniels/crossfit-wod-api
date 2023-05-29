const { saveToDatabase, DB } = require("./utils");

const getAllWorkouts = () => {
    return DB.workouts;
};

const createNewWorkout = (newWorkout) => {
    const isAlreadyAdded = DB.workout.findIndex((workout) => workout.name === newWorkout.name) > -1;

    if (isAlreadyAdded) return;

    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
};

const getWorkout = (workoutId) => {
  const workout = DB.workouts.find((workout) => workout.id === workoutId);
  if(!workout) return
    return workout;
};

module.exports = {
    getAllWorkouts,
    createNewWorkout,
    getWorkout,
};
