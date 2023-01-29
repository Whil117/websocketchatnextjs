import { MUTATE_CREATE_MESSAGE_CHAT } from "@/apollo/mutate/chat";
import { useMutation } from "@apollo/client";
import { css } from "@emotion/react";
import { useFormik } from "formik";
import { AtomInput } from "lucy-nxtjs";
import { FC, ReactNode } from "react";
import * as Yup from "yup";

type Props = {
  children?: ReactNode;
};

const SendMessage: FC<Props> = () => {
  const [EXECUTE_CREATE_MESSAGE] = useMutation(MUTATE_CREATE_MESSAGE_CHAT);

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().required(),
    }),
    onSubmit: (values, { resetForm }) => {
      EXECUTE_CREATE_MESSAGE({
        variables: {
          input: {
            conversationId: "307e712c-a61c-4baf-af0c-3710aa15a019",
            message: values.message,
            userId: "dfaad4fc-ee9a-4076-a704-cd2a13f321c9",
          },
        },
      });
      resetForm();
    },
  });
  return (
    <>
      <AtomInput
        type="textbox"
        id="message"
        height="80px"
        formik={formik}
        onKeyUp={(event) => {
          event.stopPropagation();
          if (event.key === "Enter" && !event.shiftKey && !event.repeat) {
            formik.submitForm();
          }
        }}
        customCSS={css`
          textarea {
            ::-webkit-scrollbar {
              width: 6px;
            }

            ::-webkit-scrollbar-thumb {
              background: #ccc;
              border-radius: 4px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: #b3b3b3;
              box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
            }
          }
        `}
      />
    </>
  );
};

export default SendMessage;
