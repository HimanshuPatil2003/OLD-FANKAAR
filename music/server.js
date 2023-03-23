const express=require('express');
const mongoose=require('mongoose');

const app=express();


mongoose.connect("mongodb://localhost:27017/musics",{
    useNewUrlParser:true, useUnifiedTopology:true,
}).then(()=>{
    console.log("db connection success");
}).catch((err)=>{
    console.log(err);
})

const UserSchema=new mongoose.Schema({
        name:{ type:String, required:true},
        email:{type:String, required:true, lowercase:true},
        password:{type:String, required:true}
    })
const db=new mongoose.model("music", UserSchema);


const path=require('path');
const bodyParser =require('body-parser')
const knex=require('knex');
const exp = require('constants');
const { stringify } = require('querystring');
const { connect } = require('http2');




let initialPath =__dirname;/// yaha pe "" ke andar bharna hia
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/',(req,res)=>{
    res.sendFile(path.join(initialPath, "index.html"))
})
app.get('/login',(req,res)=>{
    res.sendFile(path.join(initialPath, "login.html"))
})
app.get('/register',(req,res)=>{
    res.sendFile(path.join(initialPath, "register.html"))
})

app.post('/register',(req,res)=>{
    const {name, email, password} =req.body;

    
        // UserSchema.insert({
        //     name: name,
        //     email:email,
        //     password:password
        // })
        // .returning(["name", "email"])
        // .then(data=>{
        //     res.json(data[0])
        //     res.redirect('/');
        // })
        // .catch(err=>{
        //     if(err.detail.includes('already exists')){
        //         res.json('email already exists');
        //     }
        // })
        const x=new db(req.body);
        x.save()
        .then((result)=>{
                console.log(result);
                res.redirect('/login');
            })
            .catch(function(err){
                console.log(err);
            })
    })

app.listen(80, (req,res)=>{
    console.log('listening on port 80......')
})




