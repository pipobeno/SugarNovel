const express = require ("express")

const session = require('express-session')

const userRouter = require("./router/userRouter")
const storyRouter = require("./router/storyRouter")

const app = express()

require("dotenv").config()

app.use(express.urlencoded({extended: true}))

app.use(express.static('./public'))

app.use(session({ 
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))

app.use(userRouter)
app.use(storyRouter)


app.listen(process.env.PORT, () => {
    console.log('server is running on port 3011')
});
