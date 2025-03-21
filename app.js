const express = require ("express")

const session = require('express-session')

const userRouter = require("./router/userRouter")
const storyRouter = require("./router/storyRouter")

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(express.static('./public'))

app.use(session({ 
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))

app.use(userRouter)
app.use(storyRouter)


app.listen(3000, () => {
    console.log('server is running on port 3000')
});
