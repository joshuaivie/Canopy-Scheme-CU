import { toast } from "react-toastify";

export const errorAlert = (error, options = {}) => {
  toast.error(error, ...options);
};

export const successAlert = (message, options = {}) => {
  toast.success(message, options);
};
