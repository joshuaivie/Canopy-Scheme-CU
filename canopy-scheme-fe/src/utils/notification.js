import { toast } from "react-toastify";

export const errorAlert = error => {
  toast.error(error);
};

export const successAlert = message => {
  toast.success(message);
};
