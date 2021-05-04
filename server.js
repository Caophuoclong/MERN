const express = require('express');
const app = express();
const port = 5000;
const apiPath = '/api/';

app.use(express.json());
app.use(express.urlencoded( {extended : true} ));

//Api
app.use(apiPath + 'user', require('./routes/user.route'));
app.use(apiPath + 'signup',require('./routes/signup.route'));

app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
})