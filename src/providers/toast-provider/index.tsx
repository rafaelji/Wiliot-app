import { createContext, ReactNode, useState } from "react";
import { ToastContextType, ToastType } from "../../common/types";

export const toastContext = createContext<ToastContextType | null>(null);

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastType>({ show: false, content: "" });

  return (
    <toastContext.Provider value={{ toast, setToast }}>
      {children}
    </toastContext.Provider>
  );
};

export default ToastProvider;
