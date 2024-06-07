const { response } = require("express");
const Product = require("../model/product.model");

const postProducts = async (req, res) => {
  const { productName, productDescription, productQuantity, productPrice, productProvider } = req.body;

  try {

    const existingProduct = await Product.findOne({ productName });

    if (existingProduct) {
      return res.status(400).json({
        ok: false,
        msg: "El nombre de Producto ingresado ya existe.",
      });
    }

    const product = new Product({
      productName,
      productDescription,
      productQuantity,
      productPrice,
      productProvider,
    });

    await product.save();

    res.status(200).json({
      ok: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al insertar datos",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const productCollection = {
      productName: 1,
      productDescription: 1,
      productQuantity: 1,
      productPrice: 1,
      productProvider: 1,
      productId: 1,
    };
    const products = await Product.find({}, productCollection).lean();
    res.status(200).json({ ok: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: "Failed to retrieve products" });
  }
};

const updateProduct = async (req, res = response) => {
  const productId = req.params.id;

  try {
    const productDB = await Product.findById(productId);

    if (!productDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un producto con ese id",
      });
    }

    const newInformation = req.body;

    if (productDB.productName!== req.body.productName) {
      delete newInformation.productName;
    } else {
      const existsProduct = await Product.findOne({ productName: req.body.productName });
      if (existsProduct) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un producto con ese nombre",
        });
      }
    }

    const productUpdated = await Product.findByIdAndUpdate(productId, newInformation, {
      new: true,
    });

    res.json({
      ok: true,
      product: productUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar datos",
    });
  }
};

const getProductById = async (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const product = await Product.findOne({productId});
    if (!product) {
      return res.status(404).json({ ok: false, msg: "Product not found" });
    }
    res.status(200).json({ ok: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Server Error" });
  }
};

const deleteProduct = async (req, res = response) => {
  const productId = parseInt(req.params.id);

  try {
    const productDB = await Product.findOne({productId});

    if (!productDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un producto con ese id",
      });
    }

    await Product.findOneAndDelete({productId});

    res.json({
      ok: true,
      msg: "Producto eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al eliminar producto",
    });
  }
};

module.exports = {
  getProducts,
  postProducts,
  updateProduct,
  getProductById,
  deleteProduct,
};
