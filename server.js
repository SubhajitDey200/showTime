const connectDB = require("./utils/dbConnection");
const express = require("express");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./api/users"));
app.use("/api/auth", require("./api/auth"));
// app.use("/api/profile", require("./api/profile"));
// app.use("/api/posts", require("./api/posts"));

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
