const express = require('express'); 
const app = express();
const path = require('path');
const User = require("./models/users");
const sequelize = require("./config/db-config");
const userRoutes = require("./routes/userRoutes");

require('dotenv').config();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/users/',userRoutes);

app.use('/',function(req,res){
    res.status(200).json("ProCV server is up and running");
});

sequelize
    .sync({force:true})
    .then((result)=>{
        console.log("SQL RUN");
    })
    .catch((err)=>{
        console.log(err);
    })

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
