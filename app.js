const express = require ("express")

const userRouter = require("./router/userRouter")

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))
app.use(userRouter)

app.listen(3000, () => {
    console.log('server is running on port 3000');
});