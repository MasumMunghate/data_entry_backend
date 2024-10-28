const express = require('express');
const dotenv = require('dotenv');
const registerUserRoute = require('./routes/resiteruser.route.js')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
dotenv.config();


app.use('/api/v1',registerUserRoute);

const PORT = process.env.PORT || 3000
app.listen(PORT , ()=>{
    console.log(`App is running on port ${PORT}`);
})