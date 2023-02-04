import { QUERY_LIST_MESSAGES_BY_CHAT } from "@/apollo/query/messages";
import { SUBSCRIBE_MESSAGE_CHAT } from "@/apollo/subscribe/chat";
import {
  IMessageChatConversation,
  IQueryFilter,
  ISubscriptionFilter,
} from "@/types";
import { useQuery, useSubscription } from "@apollo/client";
import { css } from "@emotion/react";
import { AtomImage, AtomText, AtomWrapper } from "lucy-nxtjs";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  children?: ReactNode;
};

const ListMessages: FC<Props> = () => {
  const router = useRouter();
  const chatId = router?.query?.id;
  const [page, setPage] = useState(1);
  const chatScroll = useRef<HTMLDivElement>(null);
  const [newMessages, setNewMessages] = useState(
    [] as IMessageChatConversation[]
  );

  const query = useQuery<IQueryFilter<"listMessagesByChatUser">>(
    QUERY_LIST_MESSAGES_BY_CHAT,
    {
      skip: !chatId,
      variables: {
        filter: {
          take: 50,
          page: page,
          conversationId: chatId,
        },
      },
    }
  );

  useSubscription<ISubscriptionFilter<"postCreated">>(SUBSCRIBE_MESSAGE_CHAT, {
    skip: !chatId,

    variables: {
      input: {
        id: chatId,
      },
    },
    onData: (subscriptionData) => {
      setNewMessages((prev) => [
        ...prev,
        subscriptionData?.data?.data?.postCreated as IMessageChatConversation,
      ]);
    },
  });

  const messages = useMemo(
    () => query?.data?.listMessagesByChatUser?.items?.concat(newMessages),
    [query.data?.listMessagesByChatUser?.items, newMessages]
  );

  useEffect(() => setNewMessages([]), [chatId]);

  useEffect(() => {
    if (chatScroll.current && page === 1) {
      chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
    }
  }, [messages, page]);

  console.log({ messages });
  return (
    <AtomWrapper
      ref={chatScroll}
      customCSS={css`
        width: 100%;
        height: 100%;
        overflow: hidden;
        overflow-x: hidden;
        overflow-y: scroll;
        flex-direction: column;
        justify-content: flex-start;
        flex-wrap: nowrap;
        padding: 12px;
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #b3b3b3;
          box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
        }
      `}
    >
      {[...(messages?.reverse() ?? [])]?.map((item) => (
        <AtomWrapper
          height="auto"
          key={item?.id}
          customCSS={css`
            padding: 10px 10px;
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
            width="50px"
            height="50px"
          />
          <AtomWrapper>
            <AtomText>{item?.user?.fullName}</AtomText>
            <AtomText
              customCSS={css`
                overflow: hidden;
                text-overflow: Ellipsis;
                word-wrap: break-word;
                cursor: text;
              `}
            >
              {item?.message}
            </AtomText>
          </AtomWrapper>
        </AtomWrapper>
      ))}
    </AtomWrapper>
  );
};

export default ListMessages;
