const express = require("express");

const { swaggerDocs: v1SwaggerDocs, swaggerDocs } = require("./v1/swagger");

const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const v1MemberRouter = require("./v1/routes/memberRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/workouts", v1WorkoutRouter);
app.use("/api/v1/members", v1MemberRouter);

app.listen(PORT, () => {
    console.log("API listening on port " + PORT);
    swaggerDocs(app, PORT);
});
