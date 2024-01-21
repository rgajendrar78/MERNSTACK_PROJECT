import * as productService from "../services/product.js";

export const addProduct = async (req, res) => {
  try {
    const { user_id, name, brand, description } = req.body;
    const newProduct = await productService.createProduct({
      user_id,
      name,
      brand,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const allProducts = await productService.getAllProductsByUserId(id);

    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      products: allProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { product } = req.query;
    const result = await productService.searchProductsByName(product);

    res.status(200).json({
      success: true,
      message: "Search successful",
      results: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchProductFilter = async (req, res) => {
  try {
    const { name, brand, description } = req.query;
    const result = await productService.searchProductsByAttributes({
      name,
      brand,
      description,
    });

    res.status(200).json({
      success: true,
      message: "Search successful",
      results: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
