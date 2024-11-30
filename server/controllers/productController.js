const { Op } = require("sequelize");
const { Product, User } = require("../models");

class ProductController {
  static async getAllProduct(req, res, next) {
    try {
      const { search, page = 1, limit = 10 } = req.query;

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      const offset = (pageNum - 1) * limitNum;

      const whereConditions = search
        ? { name: { [Op.iLike]: `%${search}%` } }
        : {};

      const { count, rows } = await Asset.findAndCountAll({
        include: {
          model: User,
        },
        where: whereConditions,
        order: [["createdAt", "DESC"]],
        limit: limitNum,
        offset,
      });

      const totalPages = Math.ceil(count / limitNum);

      res.status(200).json({
        totalItems: count,
        totalPages,
        currentPage: pageNum,
        data: rows,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const { product_name, stock } = req.body;

      const newProduct = await Product.create({
        product_name,
        stock,
        userId: req.user.id,
      });

      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { product_name, stock } = req.body;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await product.update({
        product_name,
        stock,
      });

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await product.destroy();

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
