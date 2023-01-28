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

const useAlert = () => {
  const insertAlert = (props: Props) => {
    toast(props?.message, {
      type: props?.options?.type,
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      progressStyle: {
        backgroundColor: backgroundColorTheme[props?.options?.type],
      },
      ...props?.options,
    });
  };

  return {
    insertAlert,
    toast,
  };
};

export default useAlert;
