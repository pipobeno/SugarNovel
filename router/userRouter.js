const { PrismaClient } = require('@prisma/client');

const hashPasswordExtension = require('../services/extensions/hashPasswordExtensions');

const bcrypt = require("bcrypt");

const authguard = require('../services/authguard');

const userRouter = require('express').Router();

// const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] }).$extends(hashPasswordExtension)
const prisma = new PrismaClient().$extends(hashPasswordExtension)


// nos Routes ici

userRouter.get('/subscribe', (req, res) => {
    res.render('pages/subscribe.html.twig',
        // {
        //     title: 'Inscription',
        // }
    )
})

//Déconnexion
userRouter.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/login');
})

userRouter.post('/subscribe', async (req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body;

        // Vérifier si les mots de passe correspondent
        if (password !== confirm_password) {
            throw { confirm_password: "Les mots de passe ne correspondent pas" };
        }

        // Hacher le mot de passe avant de l'enregistrer
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer l'utilisateur dans la base de données
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword, // On enregistre le mot de passe haché
            },
        });

        res.redirect('/login'); // Redirection vers la connexion après inscription
    } catch (error) {
        if (error.code === 'P2002') {
            error = { email: "Cette adresse e-mail est déjà utilisée" };
        }
        res.render('pages/subscribe.html.twig', {
            error: error,
            title: 'Inscription',
        });
    }
});

userRouter.get('/login', (req, res) => {
    res.render('pages/login.html.twig', { title: "connexion" });
})

userRouter.post('/login', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ //On cherche un utilisateur
            where: {
                email: req.body.email //dont le mail est celui donné dans le formulaire
            }
        })
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)) { //compare les mots de passe
                req.session.user = user //stock le user en session
                res.redirect('/') //redirecction vers l'acceuil
            }
            else throw {
                password: "Mot de passe incorrect" //on renvoie l'erreur dans le catch
            }

        }
        else {
            throw { email: "Adresse e-mail inconnue" }
        }
    } catch (error) {
        res.render('pages/login.html.twig',
            {
                title: 'Connexion',
                error
            })
    }
})


userRouter.get("/", authguard, async(req,res)=> {
    res.render("pages/login.html.twig",
        {
            user: await prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            }),
            title: "Home"
        }
    )
})

module.exports = userRouter;


// userRouter.post('/subscribe', async (req, res) => {
//     try {
//         if (password !== confirm_password) {
//             const user = await prisma.user.create({
//                 data: {
//                     name: req.body.name,
//                     email: req.body.email,
//                     password: req.body.password
//                 }

//             })
//             res.redirect('/login')
//         }
//         else throw ({ confirm_password: "Les mots de passe ne correspondent pas" })
//     } catch (error) {
//         if (error.code === 'P2002') {
//             error = { email: "Cette adresse e-mail est déjà utilisée" }
//         }
//         res.render('pages/subscribe.html.twig',
//             {
//                 error: error,
//                 title: 'Inscription',
//             })
//     }

// })