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
        return res.status(400).send({
            status: "FAILED",
            data: {
                error: "One of the following kesy is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips.",
            },
        });

    const createdWorkout = workoutService.createWorkout({ name, mode, equipment, exercises, trainerTips });
    res.status(201).send({ status: "OK", data: createdWorkout });
}

function updateWorkout(req, res) {
    const { name, mode, equipment, exercises, trainerTips } = req.body;
    const workoutId = req.params.workoutId;

    const changes = {
        name,
        mode,
        equipment,
        exercises,
        trainerTips,
    };
    const updatedWorkout = workoutService.updateWorkout(workoutId, changes);
    if (!updatedWorkout) return res.status(400).send({ message: "Invalid Data" });
    res.status(200).send({ message: "Created", data: updatedWorkout });
}

function deleteWorkout(req, res) {
    const { workoutId } = req.params;

    const result = workoutService.deleteWorkout(workoutId);

    if (!result) return res.status(404).send({ message: "Workout Not Found" });

    res.status(204).send({ message: "Deleted" });
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
