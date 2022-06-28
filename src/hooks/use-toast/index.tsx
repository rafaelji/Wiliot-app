import { useContext } from "react";
import { toastContext } from "../../providers/toast-provider";
import { ToastContextType } from "../../common/types";

const useToast = () => {
  return useContext(toastContext) as ToastContextType;
};

export default useToast;
