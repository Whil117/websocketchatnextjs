import ComponentLayoutChats from "@/components/layout/chats";
import { AtomWrapper } from "lucy-nxtjs";
import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const LayoutChat: FC<Props> = (props) => {
  return (
    <AtomWrapper
      width="100%"
      height="100vh"
      flexDirection="row"
      flexWrap="nowrap"
      backgroundColor="#efefef"
      gap="2.5px"
    >
      <ComponentLayoutChats />
      <AtomWrapper width="100%" height="100%" backgroundColor="white">
        {props?.children}
      </AtomWrapper>
    </AtomWrapper>
  );
};

export default LayoutChat;
