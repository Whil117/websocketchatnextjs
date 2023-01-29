import { MUTATE_CREATE_USER } from "@/apollo/mutate/user";
import useAlert from "@/hooks/useAlert";
import exportReduceWithAtom from "@/jotai/reducers/user";
import { IMutationFilter } from "@/types";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { useSetAtom } from "jotai";
import cookie from "js-cookie";
import {
  AtomButton,
  AtomInput,
  AtomLoader,
  AtomText,
  AtomWrapper,
} from "lucy-nxtjs";
import { NextPageFC } from "next";
import { useRouter } from "next/router";
import * as Yup from "yup";

const RegisterPage: NextPageFC = () => {
  const setUser = useSetAtom(exportReduceWithAtom);
  const { insertAlert } = useAlert();
  const [EXECUTE_CREATE_USER, { loading }] = useMutation<
    IMutationFilter<"createUser">
  >(MUTATE_CREATE_USER, {
    onCompleted: (data) => {
      cookie.set("cookie_user", data?.createUser?.token as string);
      setUser({
        key: "SET",
        payload: data?.createUser?.user,
      });
      insertAlert({
        type: "success",
        message: "Welcome",
      });
      router.push("/");
    },
    onError: (error) => {
      insertAlert({
        type: "error",
        message: error?.message,
      });
    },
  });
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
    onSubmit: (values) => {
      const { email, password } = values;

      EXECUTE_CREATE_USER({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
    },
  });

  return (
    <AtomWrapper alignItems="center" justifyContent="center" height="100vh">
      <AtomLoader isLoading={loading} type="fullscreen" colorLoad="#07deff" />
      <AtomWrapper
        width="420px"
        gap="15px"
        alignItems="center"
        justifyContent="center"
      >
        <AtomText fontSize="29px" fontWeight="bold">
          Register on Bubble
        </AtomText>
        <AtomInput formik={formik} id="email" type="text" label="Email" />
        <AtomInput
          formik={formik}
          id="password"
          type="password"
          label="Password"
        />
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
            router.push("/login");
          }}
        >
          ¿Do you have a account?
        </AtomButton>
      </AtomWrapper>
    </AtomWrapper>
  );
};
RegisterPage.type = "public";
export default RegisterPage;
