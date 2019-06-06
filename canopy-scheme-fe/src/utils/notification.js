import { toast } from "react-toastify";

export const errorAlert = error => {
  toast.dismiss();
  toast.error(error);
};

export const successAlert = message => {
  toast.dismiss();
  toast.success(message);
};
