const express=require('express')
const path=require('path')
const hbs=require('hbs');
const axios=require('axios')
const { query } = require('express');
const app=express();
const port=process.env.PORT||3000;

//Define Paths for express config

const geocode=require('../utils/geocode')
const weather=require('../utils/weather')
const viewsPath=path.join(__dirname,'../templates')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine', 'hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Vic',
        title:'About Me'
    })
})
app.get('',(req,res)=>{
    res.render('index',{
        name:'Vic',
        title:'Home Page'
    })
})
app.get('/weather',(req,res)=>{
   if(!req.query.address){
       return res.send({
           error:"No Address Entered"
        }
       );
   }

   geocode(req.query.address,(error,coordinates)=>{
    if(error){
       return res.send({error})
    }
    weather(coordinates,(error,message)=>{
        if(error){
            return res.send({error})
        }
        return res.send({message})
    })
   })
   //res.send(req.query.address)

})

app.get('*',(req,res)=>{
    res.render('errorpage',{
        error:'Page Not Found'
    })
})


app.listen(port,()=>{
    console.log("App listening on port "+port)
})