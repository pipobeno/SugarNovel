const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

const authguard = require('../services/authguard');

const storyRouter = require('express').Router();

storyRouter.post("/addStory", authguard, async (req, res) => {
    try {
        const { title, author } = req.body;
        const story = await prisma.story.create({
            data: {
                title,
                author,
                userId: req.session.user.id
            }
        })
        res.redirect("/");
    } catch (error) {
        res.render("/pages/dashboard.html.twig", { error: error });
    }

})

module.exports = storyRouter;