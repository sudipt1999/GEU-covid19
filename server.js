const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const mongoose = require('mongoose');
const urlDB = 'mongodb+srv://db_user:db_password@cluster0-sorbi.mongodb.net/test?retryWrites=true&w=majority'


const User = require('./User/user')

//creating a connection to Database
mongoose
.connect(urlDB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
.then(()=>{
    console.log("MongoDB connected")
})
.catch(err=>console.log(err))




const app  = express()
app.set('view engine', 'ejs')

// CORS ERROR FOR SERVER REQUEST
app.use(cors())

// BODY PARSER MIDDLEWARE IN USE
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname , 'pages'));
app.use(express.static(path.join(__dirname , 'pages')));



// routes
app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/info',(req,res)=>{
    res.send('info')
})

app.post('/submit-info', (req, res)=>{
    const data = req.body
    const info = {...data}

    const newUserData = new User(info)
   return newUserData.save()
        .then(()=>{
            console.log("USER ADDED SUCCESSFULLY")
            res.redirect('/list-info')
        })
        .catch((err)=>{
            console.log(err)
            res.render('error')
        })
})


app.get('/list-info', (req, res)=>{
    console.log("LIST INFO PAGE")
    return User.find({}).then(data=>{
        res.render('list-donors', {data: data})
    })
})


app.get('/gallery', (req, res)=>{
    res.render('gallery')
})





// APP LISTENING 
const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`APP STARTED AT PORT ${port}`)
})