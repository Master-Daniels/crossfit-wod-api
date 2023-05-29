const workoutService = require("../services/workoutService");

function getAllWorkouts(req, res) {
    try {
        const workouts = workoutService.getAllWorkouts();
        res.status(200).send({ status: "OK", data: workouts });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

function getWorkout(req, res) {
    const workoutId = req.params.workoutId;
    if (!workoutId) {
        return res.status(400).send({ status: "FAILED", data: { error: "Parameter ':workoutId' cannot be empty " } });
    }
    try {
        const workout = workoutService.getWorkout(workoutId);
        res.status(200).send({ status: "OK", data: workout });
    } catch (error) {
        res.status(error?.status || 404).send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

function createWorkout(req, res) {
    const { name, mode, equipment, exercises, trainerTips } = req.body;
    if (!name || !mode || !equipment || !exercises || !trainerTips)
        return res.status(400).send({
            status: "FAILED",
            data: {
                error: "One of the following kesy is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips.",
            },
        });
    try {
        const createdWorkout = workoutService.createWorkout({ name, mode, equipment, exercises, trainerTips });
        res.status(201).send({ status: "OK", data: createdWorkout });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

function updateWorkout(req, res) {
    const workoutId = req.params.workoutId;
    if (!workoutId) {
        return res.status(400).send({ status: "FAILED", data: { error: "Parameter ':workoutId' cannot be empty" } });
    }
    try {
        const updatedWorkout = workoutService.updateWorkout(workoutId, body);
        res.status(200).send({ message: "Created", data: updatedWorkout });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

function deleteWorkout(req, res) {
    const { workoutId } = req.params;
    if (!workoutId) {
        return res.status(400).send({ status: "FAILED", data: { error: "Parameter ':workoutId' cannot be empty" } });
    }

    try {
        workoutService.deleteWorkout(workoutId);
        res.status(204).send({ status: "OK" });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

module.exports = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
};

const STATUS_CODES = {
    100: "Continue",
    101: "Switching Protocols",
    102: "Processing",
    103: "Early Hints",
    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non-Authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    207: "Multi-Status",
    208: "Already Reported",
    226: "IM Used",
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    307: "Temporary Redirect",
    308: "Permanent Redirect",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    418: "I'm a Teapot",
    421: "Misdirected Request",
    422: "Unprocessable Entity",
    423: "Locked",
    424: "Failed Dependency",
    425: "Too Early",
    426: "Upgrade Required",
    428: "Precondition Required",
    429: "Too Many Requests",
    431: "Request Header Fields Too Large",
    451: "Unavailable For Legal Reasons",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
    506: "Variant Also Negotiates",
    507: "Insufficient Storage",
    508: "Loop Detected",
    509: "Bandwidth Limit Exceeded",
    510: "Not Extended",
    511: "Network Authentication Required",
};
