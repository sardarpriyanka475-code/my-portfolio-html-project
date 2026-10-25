//BACKEND RULES TO WRITE CODE

//step 1: Import the required modules and dependencies at the top of the file. This includes Express, body-parser, and any other necessary libraries.
//whatever is needed to ruthe backend server should be imported here

//How th import module in Node.js
//use the require() function to import modules in Node.js. For example, to import the Express module, you would write:
//syntax require('modulenae');


     const express =require('express')
     //modules will have its own inbuilt functionss and properties which can be used in the code


//Step 2: Create express application/function by using express() function. This will create an instance of the Express application that can be used to define routes and middleware.
        const app = express()
//help us to build API

//Middleware - security layers


//Step 3: Building API  endpoint/Routes/URL - communication backend and frontend
// syntax : app.methodName('path/Address',function(req,res){-test-})

//1. first address using get method : get the data from server

app.get('/',function(req,res){
    res.send('Good Evening : Backend API running')
})

//2. Another address
app.get('/login',function(req,res){
    res.send('Good Evening Please Register')

})

//3
app.get('/register',function(req,res){
    res.send('Good Evening Please Register')
})


//Step 4:START THE BACKEND SERVER BY using app.listen()

//syntex : app.listen(Portnumber,function(){})

//portNumber - it is a number which is used to identify the backend server - address if insternet

app.listen(3000,function(){
    console.log('Backend server is running on port http://localhost:3000')
})
