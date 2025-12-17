import axios from "axios";

export const errorHandler = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error("Axios error:", error.response?.data || error.message);
  } else {
    console.error("Unexpected error:", error);
  }

  return [];
};
