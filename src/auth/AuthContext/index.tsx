import QUERY_ME from "@/apollo/query/me";
import exportReduceWithAtom from "@/jotai/reducers/user";
import { IQueryFilter } from "@/types";
import { useQuery } from "@apollo/client";
import { useSetAtom } from "jotai";
import { AtomLoader } from "lucy-nxtjs";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

const AuthContextUser = ({ children }: Props) => {
  const setUser = useSetAtom(exportReduceWithAtom);

  const [loading, setloading] = useState(true);
  const router = useRouter();
  useQuery<IQueryFilter<"me">>(QUERY_ME, {
    onCompleted: (data) => {
      setUser({
        key: "SET",
        payload: data?.me,
      });
      setloading(false);
    },
    onError: () => {
      setloading(true);
      router.push("/login");
      setUser({
        key: "CLEAR",
      });
    },
  });

  return loading ? (
    <>
      <AtomLoader type="fullscreen" isLoading backgroundColor="#1a1a1a" />
    </>
  ) : (
    <>{children}</>
  );
};

export default AuthContextUser;
