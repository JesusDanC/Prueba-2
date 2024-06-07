const express = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middleware/validateField");
const router = express.Router();

const products = require("../controller/product.controller");

router.get("/", products.getProducts);
router.post(
  "/",
  [
    check("productName", "El nombre del producto es obligatorio").not().isEmpty(),
    check("productDescription", "La descripción del producto es obligatoria").not().isEmpty(),
    check("productQuantity", "La cantidad del producto es obligatoria").isInt({ min: 0 }),
    check("productPrice", "El precio del producto es obligatorio").isFloat({ min: 0 }),
    check("productProvider", "El proveedor del producto es obligatorio").not().isEmpty(),
    validateFields,
  ],
  products.postProducts
);
router.put(
  "/:id",
  [
    check("productName", "El nombre del producto es obligatorio").not().isEmpty(),
    check("productDescription", "La descripción del producto es obligatoria").not().isEmpty(),
    check("productQuantity", "La cantidad del producto es obligatoria").isInt({ min: 0 }),
    check("productPrice", "El precio del producto es obligatorio").isFloat({ min: 0 }),
    check("productProvider", "El proveedor del producto es obligatorio").not().isEmpty(),
    validateFields,
  ],
  products.updateProduct
);
router.get("/:id", products.getProductById);
router.delete("/:id", products.deleteProduct);

module.exports = router;
