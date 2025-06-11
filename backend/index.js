require("dotenv").config();
const express = require('express');
const dbConnect = require("./utils/db_connect");
const taskRoutes = require("./routes/taskRoute");
const app = express();

const PORT = process.env.PORT || 5555;

app.use(express.json());

dbConnect();

// app.get('/', (req, res) => {
//     res.send('Hello, Node.js!');
// });

app.use('/', taskRoutes);

app.listen(PORT, () => {
    console.log('You are running on port', PORT);
});