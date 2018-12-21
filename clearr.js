const express = require('express');
const app = express();
const bdata = require('./bdata');
const bcrypt= require('bcrypt');
const bodyparser=require('body-parser');
const User = require('./bdata');
const port=8080;
const mongoose=require('mongoose');
app.use(bodyparser.json())


db=mongoose.connect("mongodb://localhost:27017/bcrypt", { useNewUrlParser: true });
 if(db)
 	console.log("connected to MongoDB");



app.post('/user',async(req,res)=>{
   var user = new User();
    let data = await User.findOne({ email: req.body.email });
  if (data)  
  	return res.status(400).send('User already registered.');
   
    user.name=req.body.name;
    user.email=req.body.email;


    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(req.body.password,salt)
    await user.save()
    res.json(req.body);
});




app.get('/auth',async(req,res)=>{
    let user = await User.findOne({ email: req.body.email });
    if(!user)
    return res.send('userid Incorrect')

    const valid=await bcrypt.compare(req.body.password,user.password);
    if(!valid)
    console.log('Invalid Password')
    else
    console.log('CorrectPassword');
    res.send('Hurray');
});
	


app.listen(port,()=>{
    console.log(`Listening to port:${port}`);
})