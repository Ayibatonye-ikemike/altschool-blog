const database = require("./database/index")
require('dotenv').config();
const app = require("./app")


const PORT = process.env.PORT


// connect to database
database.connect();


//start server

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})
