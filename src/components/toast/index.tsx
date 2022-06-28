import React, { useEffect } from "react";
import useToast from "../../hooks/use-toast";

import "./style.css";

const Toast = () => {
  const { toast, setToast } = useToast();

  useEffect(() => {
    if (toast.show) {
      setTimeout(() => {
        setToast({ show: false });
      }, 3000);
    }
  }, [toast]);

  return (
    <div
      className={`toast ${toast.show ? "show" : ""}`}
      onClick={() => setToast({ show: false })}
    >
      <p className={"toast-content"}>{toast.content}</p>
    </div>
  );
};

export default Toast;
