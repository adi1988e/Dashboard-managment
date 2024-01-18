import customFetch from "../utils/axios";

// Managers
export async function login({ email, password }) {
  try {
    const response = await customFetch.post("/users/managers/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getCurrentUser(token) {
  try {
    const response = await customFetch.get("/users/managers/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function logout(token) {
  try {
    const response = await customFetch.get("/users/managers/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function updateCurrentUser(data) {
  const { _id, avatar } = data;
  const response = await customFetch.put(`/users/update-account/${_id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (response.error) throw new Error(response.error.message);
  if (!avatar) return data;
  return response.data.data;
}

export async function getManagers() {
  try {
    const response = await customFetch.get("/users/all-managers-for-admin");
    const managers = response.data.managers;
    return managers;
  } catch (error) {
    throw new Error("Managers could not be loaded");
  }
}
export async function deleteManager(_id) {
  try {
    await customFetch.delete(`/users/delete-manager-for-admins/${_id}`);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createEditManager(newManager, _id) {
  try {
    const manager = newManager.data;
    if (_id) {
      const response = await customFetch.put(
        `/users/update-manager-for-admin/${_id}`,
        { data: manager }
      );
      return response.data;
    } else {
      const response = await customFetch.post(
        "/users/admins/add-manager",
        newManager
      );
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

// Users
export async function getUsers() {
  try {
    const response = await customFetch.get("/users/all-users-for-managers");
    const users = response.data.users;
    return users;
  } catch (error) {
    throw new Error("Users could not be loaded");
  }
}
export async function deleteUser(_id) {
  try {
    await customFetch.delete(`/users/delete-user-for-managers/${_id}`);
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function createEditUser(newUser, _id) {
  const user = newUser.data;
  if (_id) {
    const response = await customFetch.put(
      `/users/update-user-for-managers/${_id}`,
      { data: user }
    );
    return response.data;
  } else {
    const response = await customFetch.post(
      "/users/add-user-for-managers",
      newUser
    );
    return response.data;
  }
}

// Customers
export async function getCustomers() {
  try {
    const response = await customFetch.get("/users/all-customers");
    const customers = response.data.customers;
    return customers;
  } catch (error) {
    throw new Error("Customers could not be loaded");
  }
}
export async function deleteCustomer(_id) {
  try {
    await customFetch.delete(`/users/delete-customer-for-manager/${_id}`);
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function createEditCustomer(newCustomer, _id) {
  try {
    if (_id) {
      const response = await customFetch.put(
        `/users/update-customer-for-managers/${_id}`,
        { data: newCustomer }
      );
      return response.data.customer;
    } else {
      const response = await customFetch.post("/users/signup", newCustomer);
      return response.data.customer;
    }
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
