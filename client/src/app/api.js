import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// export const setAuthToken = (token) => {
//   if (token) {
//     api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common["Authorization"];
//   }
// };

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/auth/signin", loginData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const logoutUser = async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    const response = await api.post("/auth/logout", null, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const getAllworkout = async () => {
  try {
    const response = await api.get("getWorkouts/1"); //on work
    return response.data;
  } catch (err) {
    throw new Error("An unexpected error occurred");
  }
};

export const getWorkouts = async (userId) => {
  try {
    const response = await api.get(`/workouts/${userId}`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch workouts", error);
    throw error;
  }
};

export const getExercises = async () => {
  try {
    const response = await api.get("/exercises");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch exercises", error);
    throw error;
  }
};

export const getExerciseById = async (id) => {
  try {
    console.log(id);
    const response = await api.get(`exercises/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch exercise", error);
    throw error;
  }
};

export default api;
