import { toast, ToastOptions, TypeOptions } from "react-toastify";

type Props = {
  type: TypeOptions;
  message: string;
  options?: ToastOptions<{}>;
};

const backgroundColorTheme = {
  success: "#33ff77",
  error: "#f36",
};

type useAlertProps = {
  theme?: "light" | "dark" | "colored";
};

const useAlert = (args?: useAlertProps) => {
  const insertAlert = (props: Props) => {
    toast(props?.message, {
      type: props?.type,
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: args?.theme ?? "dark",
      ...props?.options,
    });
  };

  return {
    insertAlert,
    toast,
  };
};

export default useAlert;
