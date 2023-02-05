import { IMessageChatConversation } from "@/types";
import { css } from "@emotion/react";
import { AtomImage, AtomText, AtomWrapper } from "lucy-nxtjs";
import { FC } from "react";

type Props = IMessageChatConversation;

const MessageByConversation: FC<Props> = (item) => {
  return (
    <AtomWrapper
      height="auto"
      width="100%"
      customCSS={css`
        padding: 10px 10px;
        flex: 1;
        gap: 10px;
        &:hover {
          background-color: var(--background-color-tertiary);
        }
        display: grid;
        grid-template-columns: 50px 1fr;
      `}
    >
      <AtomImage
        src={item?.user?.image as string}
        width="45px"
        height="45px"
        borderRadius="50%"
      />
      <AtomWrapper width="inherit">
        <AtomText fontWeight="600">{item?.user?.fullName}</AtomText>
        <AtomText
          customCSS={css`
            overflow: hidden;
            text-overflow: Ellipsis;
            cursor: text;
            width: 100%;
            overflow: hidden;
            text-overflow: Ellipsis;
            word-break: break-all;
            flex: 1;
          `}
        >
          {item?.message}
        </AtomText>
      </AtomWrapper>
    </AtomWrapper>
  );
};

export default MessageByConversation;
