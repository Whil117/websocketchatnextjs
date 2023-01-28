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
        width="100%"
        height="100vh"
        flexDirection="row"
        flexWrap="nowrap"
        backgroundColor="#424242"
        gap="2.5px"
        customCSS={css`
          display: grid;
          grid-template-columns: 360px 1fr;
          @media (max-width: 980px) {
            grid-template-columns: 1fr;
          }
        `}
      >
        <ComponentLayoutChats />
        <AtomWrapper
          width="100%"
          height="100vh"
          backgroundColor="var(--background-color-secondary)"
        >
          {props?.children}
        </AtomWrapper>
      </AtomWrapper>
    </AuthContextUser>
  );
};

export default LayoutChat;
