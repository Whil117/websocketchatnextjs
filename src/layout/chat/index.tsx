import AuthContextUser from "@/auth/AuthContext";
import ComponentLayoutChats from "@/components/layout/chats";
import { css } from "@emotion/react";
import { AtomWrapper } from "lucy-nxtjs";
import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const LayoutChat: FC<Props> = (props) => {
  return (
    <AuthContextUser>
      <AtomWrapper
        customCSS={css`
          display: grid;
          grid-template-columns: 320px 1fr;
        `}
      >
        <ComponentLayoutChats />
        <AtomWrapper
          width="100%"
          customCSS={css`
            overflow: hidden;
          `}
        >
          {props?.children}
        </AtomWrapper>
      </AtomWrapper>
    </AuthContextUser>
  );
};

export default LayoutChat;
