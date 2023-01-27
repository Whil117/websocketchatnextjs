/* eslint-disable react/no-unescaped-entities */
import exportReduceWithAtom from "@/jotai/reducers/user";
import { useFormik } from "formik";
import { useAtom } from "jotai";
import { AtomButton, AtomInput, AtomText, AtomWrapper } from "lucy-nxtjs";
import { NextPageFC } from "next";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import * as Yup from "yup";
type Props = {
  children?: ReactNode;
};

const LoginPage: NextPageFC = (props) => {
  const [user, setUser] = useAtom(exportReduceWithAtom);

  const router = useRouter();

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
        <AtomButton
          padding="0px"
          color="white"
          backgroundColor="transparent"
          onClick={() => {
            router.push("/register");
          }}
        >
          ¿Do you don't have a account?
        </AtomButton>
      </AtomWrapper>
    </AtomWrapper>
  );
};
LoginPage.type = "public";
export default LoginPage;
