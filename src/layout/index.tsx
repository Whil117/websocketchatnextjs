import { FC, ReactNode } from "react";
import LayoutChat from "./chat";

type PropsPublic = {
  children?: ReactNode;
};

const Layouts = {
  chat: LayoutChat,
  public: ({ children }: PropsPublic) => <>{children}</>,
};
export type PropsLayout = {
  children?: ReactNode;
  type: keyof typeof Layouts;
};
const LayoutFC: FC<PropsLayout> = (props) => {
  const Component = Layouts[props?.type ?? "public"];
  return <Component {...props}> {props?.children}</Component>;
};

export default LayoutFC;
