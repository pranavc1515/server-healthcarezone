const Category = require("../../model/category/category.model.js");

module.exports = { addCategory, getCategories, getByServiceRef };

async function addCategory(categoryDetails) {
  try {
    // Map `services` to `serviceRef` for correct schema mapping
    if (categoryDetails.services) {
      categoryDetails.serviceRef = categoryDetails.services;
      delete categoryDetails.services; // Remove `services` to avoid schema mismatch
    }

    // Ensure `serviceRef` is always an array
    if (!Array.isArray(categoryDetails.serviceRef)) {
      categoryDetails.serviceRef = [categoryDetails.serviceRef];
    }

    const newCategory = new Category(categoryDetails);
    console.log("newCategory", newCategory);
    await newCategory.save();
    return newCategory;
  } catch (error) {
    console.error("Error in addCategory:", error);
    throw error;
  }
}

async function getCategories() {
  try {
    const allCategories = await Category.find()
      .populate("serviceRef", "serviceName") // Fetch service name instead of just IDs
      .populate("cityRef", "cityName");

    return { allCategories };
  } catch (error) {
    console.error("Error in getCategories:", error);
    throw error;
  }
}

async function getByServiceRef(params) {
  try {
    const serviceRef = params.query?.serviceRef || params.serviceRef; // Handle different param structures
    if (!serviceRef) {
      throw new Error("serviceRef is required");
    }

    const categoryByServiceRef = await Category.find({
      serviceRef: { $in: [serviceRef] },
    });

    return { categoryByServiceRef };
  } catch (error) {
    console.error("Error in getByServiceRef:", error);
    throw error;
  }
}
