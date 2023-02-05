import { QUERY_LIST_MESSAGES_BY_CHAT } from "@/apollo/query/messages";
import { SUBSCRIBE_MESSAGE_CHAT } from "@/apollo/subscribe/chat";
import {
  IMessageChatConversation,
  IQueryFilter,
  ISubscriptionFilter,
} from "@/types";
import { useQuery, useSubscription } from "@apollo/client";
import { css } from "@emotion/react";
import { AtomWrapper } from "lucy-nxtjs";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import MessageByConversation from "../message";

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
      fetchPolicy: "cache-and-network",
      variables: {
        filter: {
          take: 50,
          page: page,
          conversationId: chatId,
        },
      },
      onCompleted: () => {
        setNewMessages([]);
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

  const messages = query.data?.listMessagesByChatUser?.items;

  useEffect(() => {
    if (chatScroll.current && page === 1) {
      chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
    }
  }, [messages, page, newMessages]);
  console.log({
    newMessages,
  });

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
        flex-wrap: nowrap;
        flex: 1;
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
      {query.data?.listMessagesByChatUser?.items?.map((item) => (
        <MessageByConversation key={item?.id} {...item} />
      ))}
      {newMessages?.map((item) => (
        <MessageByConversation key={item?.id} {...item} />
      ))}
    </AtomWrapper>
  );
};

export default ListMessages;
