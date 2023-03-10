import AuthContextUser from "@/auth/AuthContext";
import ComponentLayoutChats from "@/components/layout/chats";
import MiniSidebarPage from "@/components/layout/chats/miniSidebar";
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
          grid-template-columns: 60px 320px 1fr;
          @media (max-width: 980px) {
            grid-template-columns: 1fr;
          }
        `}
      >
        <MiniSidebarPage />
        <ComponentLayoutChats />
        <AtomWrapper
          width="100%"
          customCSS={css`
            flex: 1;
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
