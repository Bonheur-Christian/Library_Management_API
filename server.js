require('dotenv').config();
const express = require('express');
const BookRoute = require("./routes/BookRoute")
const app = express();

const PORT = process.env.PORT;



app.use(express.json());

app.use("/api/books", BookRoute);

const port = 3001;

app.listen(port, () => {
    console.log("Server is running on port " + port);

})