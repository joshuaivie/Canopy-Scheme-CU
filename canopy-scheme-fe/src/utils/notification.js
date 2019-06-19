import { toast } from "react-toastify";

export const errorAlert = error => {
  if (toast.isActive(window.toastID))
    return toast.update(window.toastID, { type: toast.TYPE.ERROR, render: error });
  window.toastID = toast.error(error);
};

export const successAlert = message => {
  if (toast.isActive(window.toastID))
    return toast.update(window.toastID, {
      type: toast.TYPE.SUCCESS,
      render: message
    });
  window.toastID = toast.success(message);
};
