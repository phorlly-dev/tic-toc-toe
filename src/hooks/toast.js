import * as React from "react";
import { ToastContext } from "../components/ToastProvider";

export const useToast = () => React.useContext(ToastContext);
