/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import HeaderChat from "@/components/chat/headerChat";
import ListMessages from "@/components/chat/listMessages";
import SendMessage from "@/components/chat/sendMessage";
import { css } from "@emotion/react";
import { AtomButton, AtomWrapper } from "lucy-nxtjs";
import { NextPageFC } from "next";
import { useRef, useState } from "react";

const ChatById: NextPageFC = () => {
  const [page, setPage] = useState(1);

  const chatScroll = useRef<HTMLDivElement>(null);

  return (
    <AtomWrapper
      height="100%"
      width="100%"
      customCSS={css`
        flex: 1;
      `}
    >
      <HeaderChat />
      <ListMessages />
      <AtomWrapper
        height="auto"
        customCSS={css`
          padding: 12px;
        `}
      >
        {page !== 1 && (
          <AtomButton
            borderRadius="10px 10px 0px 0px"
            width="100%"
            margin="5px"
            backgroundLinearGradient={{
              rotate: "315deg",
              secondary: "#07deff",
              primary: "#0f97ff",
            }}
            whileHover={{
              scale: 1,
            }}
            whileTap={{
              scale: 0.99,
            }}
            onClick={() => {
              setPage(1);
              if (chatScroll.current) {
                chatScroll.current.scrollTop =
                  chatScroll.current.scrollHeight - 40;
              }
            }}
          >
            You're viewing older messages Jump To Present <br />
            page {page}
          </AtomButton>
        )}
        <SendMessage />
      </AtomWrapper>
    </AtomWrapper>
  );
};
ChatById.type = "chat";

export default ChatById;
