import customFetch from "../utils/axios";

export async function getProducts() {
  try {
    const response = await customFetch.get("/products/products");
    const data = response.data.products;
    return data;
  } catch (error) {
    throw new Error("Products could not be loaded");
  }
}

export async function createEditProduct(newProduct, _id) {
  try {
    if (_id) {
      const response = await customFetch.put(
        `/products/managers/update/${_id}`,
        newProduct
      );
      return response.data;
    } else {
      const response = await customFetch.post(
        "/products/managers/add",
        newProduct,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteProduct(_id) {
  try {
    await customFetch.delete(`/products/managers/delete/${_id}`);
  } catch (error) {
    throw new Error("Product could not be deleted");
  }
}
