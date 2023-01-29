/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { QUERY_LIST_MESSAGES_BY_CHAT } from "@/apollo/query/messages";
import { SUBSCRIBE_MESSAGE_CHAT } from "@/apollo/subscribe/chat";
import SendMessage from "@/components/chat/sendMessage";
import { IQueryFilter } from "@/types";
import { useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import { AtomButton, AtomImage, AtomText, AtomWrapper } from "lucy-nxtjs";
import { NextPageFC } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

const ChatById: NextPageFC = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const chatId = useMemo(() => router?.query?.id, [router]);

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
  const { subscribeToMore, data } = query;

  useEffect(() => {
    subscribeToMore({
      document: SUBSCRIBE_MESSAGE_CHAT,
      variables: {
        input: {
          id: chatId,
        },
      },
      updateQuery: (prev, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data?.postCreated;
        const result = Object.assign({}, prev, {
          listMessagesByChatUser: {
            ...prev.listMessagesByChatUser,
            items: [newMessage, ...(prev?.listMessagesByChatUser?.items ?? [])],
          },
        });

        return result;
      },
    });

    return () => {};
  }, [chatId]);

  const messages = [...(data?.listMessagesByChatUser?.items ?? [])]?.reverse();

  const chatScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScroll.current && page === 1) {
      chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
    }
  }, [messages, page]);

  return (
    <AtomWrapper height="100%" width="100%">
      <AtomWrapper
        backgroundColor="var(--background-color-secondary)"
        height="100px"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start"
        padding="20px"
      >
        <AtomImage
          src="https://picsum.photos/200/300"
          width="45px"
          height="45px"
          borderRadius="10px"
        />
        <AtomText width="auto" fontWeight="bold" fontSize="16px">
          Whil García
        </AtomText>
      </AtomWrapper>

      <AtomWrapper
        ref={chatScroll}
        onScroll={() => {
          if (chatScroll.current) {
            const { scrollTop, clientHeight, scrollHeight } =
              chatScroll.current;

            if (data?.listMessagesByChatUser?.pageInfo?.hasNextPage) {
              if (chatScroll.current.scrollTop === 0) {
                setPage((prev) => prev + 1);
              }
            }

            if (data?.listMessagesByChatUser?.pageInfo?.hasPreviousPage) {
              if (scrollTop + clientHeight === scrollHeight) {
                setPage((prev) => prev - 1);
              }
            }
          }
        }}
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
        {messages?.map((item) => (
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
