const { DB } = require("./utils");

const getRecordForWorkOut = (workoutId) => {
    try {
        const record = DB.records.filter((record) => record.workout === workoutId);
        if (!record || record.length < 1)
            throw {
                status: 404,
                message: `Can't find workout with the Id {${workoutId}}`,
            };
        return record;
    } catch (error) {
        throw { status: error?.status || 500, message: error.message || error };
    }
};

module.exports = {
    getRecordForWorkOut,
};
