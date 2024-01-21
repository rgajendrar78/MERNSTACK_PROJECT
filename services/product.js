import { productModel } from "../models/product.js";

export const createProduct = async ({ user_id, name, brand, description }) => {
  try {
    if (!user_id || !name || !brand || !description) {
      throw new Error(
        "Invalid input data. Please provide user_id, name, brand, and description."
      );
    }

    const newProduct = await productModel.create({
      user_id,
      name,
      brand,
      description,
    });

    return newProduct;
  } catch (error) {
    throw new Error("Error adding product");
  }
};

export const getAllProductsByUserId = async (userId) => {
  try {
    const allProducts = await productModel
      .find({ user_id: userId })
      .populate("user_id", "name email");

    return allProducts;
  } catch (error) {
    throw new Error("Error fetching products");
  }
};

export const searchProductsByName = async (productName) => {
  try {
    if (!productName) {
      throw new Error("Please provide a search query");
    }

    const regex = new RegExp(productName, "i");
    const result = await productModel.find({
      $or: [
        { name: { $regex: regex } },
        { brand: { $regex: regex } },
        { description: { $regex: regex } },
      ],
    });

    return result;
  } catch (error) {
    throw new Error("Error searching products");
  }
};

export const searchProductsByAttributes = async ({
  name,
  brand,
  description,
}) => {
  try {
    if (!name && !brand && !description) {
      throw new Error(
        "Please provide at least one search parameter (name, brand, or description)"
      );
    }

    const queryObject = {};
    if (name) queryObject.name = { $regex: new RegExp(name, "i") };
    if (brand) queryObject.brand = { $regex: new RegExp(brand, "i") };
    if (description)
      queryObject.description = { $regex: new RegExp(description, "i") };

    const result = await productModel.find(queryObject);
    return result;
  } catch (error) {
    throw new Error("Error searching products");
  }
};
