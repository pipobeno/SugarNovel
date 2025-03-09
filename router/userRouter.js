const { PrismaClient } = require('@prisma/client');


const bcrypt = require("bcrypt");

const hashPasswordExtension = require('../services/extensions/hashPasswordExtension');


const userRouter = require('express').Router();

const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error']}).$extends(hashPasswordExtension)


// nos Routes ici
userRouter.get('/subscribe', (req, res) => {
    res.render('pages/subscribe.html.twig',
        {
            title: 'Inscription',
        })
})

userRouter.post('/subscribe', (req, res) => {
    // const prisma = new PrismaClient().$extends({
        query: {
            user: {
                create: async ({ args, query }) => {
                    try {
                        const hash = await bcrypt.hash(args.data.password, 10);
                        args.data.password = hash;
                        return query(args)
                    } catch (error) {
                        throw error
                    }
                }
            }
        }
    })
// })

module.exports = userRouter