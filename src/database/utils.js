const fs = require("fs");
const path = require("path");

const DB = JSON.parse(fs.readFileSync(path.join(__dirname, "../database/db.json")));

const saveToDatabase = (DB) => {
    fs.writeFileSync(path.join(__dirname, "./db.json"), JSON.stringify(DB, null, 2), { encoding: "utf-8" });
};

module.exports = { saveToDatabase, DB };
