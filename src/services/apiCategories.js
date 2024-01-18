import customFetch from "../utils/axios";

export async function getCategories() {
  try {
    const response = await customFetch.get("/categories/managers/all");
    const categories = response.data.categories;
    return categories;
  } catch (error) {
    throw new Error("Categories could not be loaded");
  }
}
export async function deleteCategory(id) {
  try {
    await customFetch.delete(`/categories/managers/delete-category/${id}`);
  } catch (error) {
    throw new Error("Categories could not be deleted");
  }
}
export async function createEditCategory(newCategory, _id) {
  if (_id) {
    const response = await customFetch.put(
      `/categories/managers/update-category/${_id}`,
      { data: newCategory }
    );
    return response.data;
  } else {
    const response = await customFetch.post(
      "/categories/managers/add-category",
      newCategory
    );
    return response.data;
  }
}
