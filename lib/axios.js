import axios from "axios";

export async function connectAxios() {
  try {
    const axiosInstance = axios.create({
      baseURL: "http://10.14.31.172:2000",
    });

    console.log("Connected to database")

    return axiosInstance;
  } catch (error) {
    console.error("Failed connect to database");
  }
}
