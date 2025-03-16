const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const authguard = async (req, res, next) => {
    try {
        if (req.session.user) {
            let user = await prisma.user.findUnique({
                where: {
                    email: req.session.user.email
                }
            })
            if (user) {
                return next();
            }

        }
        throw new Error("Utilisateur non connecté");
    }
    catch (error) {
        res.redirect('/login')
    }

}


module.exports = authguard;