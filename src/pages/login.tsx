import { useFormik } from "formik";
import { AtomButton, AtomInput, AtomText, AtomWrapper } from "lucy-nxtjs";
import { NextPageFC } from "next";
import { ReactNode } from "react";
import * as Yup from "yup";
type Props = {
  children?: ReactNode;
};

const LoginPage: NextPageFC = (props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: () => {},
  });
  return (
    <AtomWrapper alignItems="center" justifyContent="center" height="100vh">
      <AtomWrapper
        width="420px"
        gap="15px"
        alignItems="center"
        justifyContent="center"
      >
        <AtomText fontSize="29px" fontWeight="bold">
          Welcome to Bubble
        </AtomText>
        {JSON.stringify(formik.errors)}
        <AtomInput formik={formik} id="email" type="text" label="Email" />
        <AtomInput formik={formik} id="password" type="text" label="Password" />
        <AtomButton
          backgroundLinearGradient={{
            rotate: "315deg",
            secondary: "#07deff",
            primary: "#0f97ff",
          }}
          width="100%"
          onClick={formik.submitForm}
        >
          Sign in
        </AtomButton>
      </AtomWrapper>
    </AtomWrapper>
  );
};
LoginPage.type = "public";
export default LoginPage;
