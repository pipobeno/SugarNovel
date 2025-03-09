const { PrismaClient } = require('@prisma/client');

const bcrypt = require("bcrypt");

const hashPasswordExtension = require('../services/extensions/hashPasswordExtensions');

const userRouter = require('express').Router();

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] }).$extends(hashPasswordExtension)


// nos Routes ici
userRouter.get('/subscribe', (req, res) => {
    res.render('pages/subscribe.html.twig',
        {
            title: 'Inscription',
        })
})

userRouter.post('/subscribe', async (req, res) => {
    try {
        if (req.body.password !== req.body.confirm_password) {
            const user = await prisma.user.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }

            })
            res.redirect('/login')
        }
        // else throw ({confirm_password: "Les mots de passe ne correspondent pas" })
    } catch (error) {
        if (error.code === 'P2002') {
            error = {email: "Cette adresse e-mail est déjà utilisée" }
        }
        res.render('pages/subscribe.html.twig',
            {
                error: error,
                title: 'Inscription',
            })
    }

})


userRouter.get('/login', (req, res) => {
    res.render('pages/login.html.twig',
        {
            title: 'Connexion',
        })
})


module.exports = userRouter