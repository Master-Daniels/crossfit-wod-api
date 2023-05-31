const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Crossfit WOD API",
            version: "1.0.0",
            description: "A simple API built with Express(Nodejs) and documented with swagger",
            servers: ["http://localhost:300 - Development Server"],
        },
    },
    apis: [
        "./src/v1/routes/workoutRoutes.js",
        "./src/v1/routes/memberRoutes.js",
        "./src/database/Workout.js",
        "./src/database/Member.js",
    ],
};

// Docs in JSON format
const spec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
    app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(spec));
    app.get("/api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(spec);
    });
    console.log(`Version 1 Docs available on http://localhost:${port}/api/v1/docs`);
};

module.exports = { swaggerDocs };
