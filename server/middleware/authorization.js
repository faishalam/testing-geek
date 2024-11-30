// middleware/authorization.js
const { User, Product } = require("../models");

async function authorization(req, res, next) {
    try {
        const { id } = req.user;
        const user = await User.findByPk(id);

        if (!user) throw { name: 'notFound' };

        if (user.role === 'admin') {
            next();
        } else {
            const product = await Product.findByPk(req.params.id);
            if (product && product.authorId === user.id) {
                next();
            } else {
                throw { name: "Forbidden" };
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports = authorization;
