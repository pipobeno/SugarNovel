const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authguard = require('../services/authguard');
const storyRouter = require('express').Router();

storyRouter.get("/addstory", authguard, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                userId: req.session.user.id
            }
        });
        res.render("pages/dashboard.html.twig", {user: req.session.user });
    } catch (error) {
        console.error(error);
        res.render("pages/dashboard.html.twig", { error: error.message });
    }
});


module.exports = storyRouter;