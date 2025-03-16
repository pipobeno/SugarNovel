// const express = require("express"); // Import du moteur Twig
// const session = require("express-session");

// const userRouter = require("./router/userRouter");

// const app = express();

// // Configuration de Twig
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'twig');

// // Middleware
// app.use(express.static("./public")); // Pour les fichiers statiques (CSS, JS, images)
// app.use(express.urlencoded({ extended: true })); // Pour récupérer les données POST
// app.use(session({
//     secret: "keyboard cat",
//     resave: true,
//     saveUninitialized: true,
// }));

// // Routes
// app.use(userRouter);
// app.use(bookRouter);

// // Lancement du serveur
// app.listen(3000, () => {
//     console.log("✅ Serveur démarré sur http://localhost:3000");
// });


const express = require ("express")

const session = require('express-session')

const userRouter = require("./router/userRouter")

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(express.static('./public'))

app.use(session({ 
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))

app.use(userRouter)

app.listen(3000, () => {
    console.log('server is running on port 3000')
});