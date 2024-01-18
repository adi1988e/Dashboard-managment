import customFetch from "../utils/axios";

export async function getOrders() {
  try {
    const response = await customFetch.get("/orders/managers/all");
    return response.data.orders;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function changeStatus({ id, value }) {
  const editStatusUrl = "/orders/managers/update-status";
  try {
    const response = await customFetch.put(`${editStatusUrl}/${id}`, {
      status: value,
    });
    if (!response.data.success) {
      throw new Error(response.data.error);
    }
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getOrder(id) {
  try {
    const response = await customFetch.get(
      `/orders/managers/order-details/${id}`
    );
    return response.data.order;
  } catch (error) {
    throw new Error("Order not found");
  }
}

export async function getOrdersAfterDate(date) {
  try {
    const response = await customFetch.get(`/orders/managers/getAfterDate`);
    return response.data;
  } catch (error) {
    throw new Error("Orders could not get loaded");
  }
}

export async function getStaysAfterDate(date) {
  const response = await customFetch.get("/orders/managers/getAfterDate");
  if (response.error) {
    throw new Error("Orders could not get loaded");
  }
  return response.data.orders;
}

export async function getStaysTodayActivity() {
  try {
    const response = await customFetch.get(
      "/orders/managers/getStaysTodayActivity"
    );
    return response.data.orders;
  } catch (error) {
    throw new Error("Orders could not get loaded");
  }
}

export async function deleteOrder(id) {
  try {
    await customFetch.delete(`/orders/managers/delete-order/${id}`);
  } catch (error) {
    throw new Error("Order could not be deleted");
  }
}
