/* eslint-disable react-hooks/exhaustive-deps */
import { MUTATE_CREATE_MESSAGE_CHAT } from "@/apollo/mutate/chat";
import { QUERY_LIST_MESSAGES_BY_CHAT } from "@/apollo/query/messages";
import { SUBSCRIBE_MESSAGE_CHAT } from "@/apollo/subscribe/chat";
import { useMutation, useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import { useFormik } from "formik";
import { AtomImage, AtomInput, AtomText, AtomWrapper } from "lucy-nxtjs";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useMemo, useRef } from "react";

type Props = {
  children?: ReactNode;
};

const ChatById: FC<Props> = () => {
  const router = useRouter();

  const { data, subscribeToMore } = useQuery(QUERY_LIST_MESSAGES_BY_CHAT, {
    skip: !router?.query?.id,
    variables: {
      filter: {
        take: 50,
        page: 1,
        conversationId: router?.query?.id,
      },
    },
  });

  const [EXECUTE_CREATE_MESSAGE] = useMutation(MUTATE_CREATE_MESSAGE_CHAT);

  useEffect(() => {
    subscribeToMore({
      document: SUBSCRIBE_MESSAGE_CHAT,
      variables: {
        input: {
          id: "307e712c-a61c-4baf-af0c-3710aa15a019",
        },
      },
      updateQuery: (prev, { subscriptionData }: any) => {
        const newItem = subscriptionData?.data?.postCreated;

        console.log(newItem, "newItemnewItemnewItemnewItem");

        return {
          listMessagesByChatUser: {
            ...prev?.listMessagesByChatUser,
            items: [
              ...prev?.listMessagesByChatUser?.items,
              {
                conversationId: newItem?.conversationId,
                id: newItem?.id,
                message: newItem?.message,
                userId: newItem?.userId,
                user: null,
                createdAt: newItem?.createdAt ?? Date.now(),
              },
            ],
          },
        };
      },
    });
  }, [router?.query?.id]);

  const messages = useMemo(
    () =>
      [...(data?.listMessagesByChatUser?.items ?? [])]?.sort(
        (a, b) => a.createdAt - b.createdAt
      ),
    [data?.listMessagesByChatUser?.items]
  );
  console.log(messages, "messages");

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: (values, { resetForm }) => {
      EXECUTE_CREATE_MESSAGE({
        variables: {
          input: {
            conversationId: "307e712c-a61c-4baf-af0c-3710aa15a019",
            message: values.message,
            userId: "dfaad4fc-ee9a-4076-a704-cd2a13f321c9",
          },
        },
      });
      resetForm();
    },
  });

  const chatScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScroll.current) {
      chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
    }
  }, [router?.query?.id, data?.listMessagesByChatUser?.items]);

  return (
    <AtomWrapper
      customCSS={css`
        flex-direction: column;
        flex-wrap: nowrap;
        overflow: hidden;
      `}
      height="100%"
    >
      <AtomWrapper
        height="60px"
        width="100%"
        padding="10px"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="row"
        flexWrap="nowrap"
        gap="5px"
        backgroundColor="#f0f0f0"
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
        customCSS={css`
          height: 100%;
          overflow: hidden;
          overflow-x: hidden;
          overflow-y: scroll;
          flex-direction: column;
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
        {messages?.map((item, index) => (
          <AtomWrapper
            key={item?.id}
            customCSS={css`
              padding: 10px 10px;
              display: grid;
              gap: 10px;
              &:hover {
                background-color: #f0f0f0;
              }
            `}
          >
            <AtomText
              customCSS={css`
                width: 100%;
                overflow: hidden;
                text-overflow: Ellipsis;
                word-wrap: break-word;
                cursor: text;
              `}
            >
              {item.message}
            </AtomText>
          </AtomWrapper>
        ))}
      </AtomWrapper>
      <AtomWrapper
        customCSS={css`
          padding: 12px;
        `}
      >
        <AtomInput
          type="textbox"
          id="message"
          height="80px"
          formik={formik}
          onKeyUp={(event) => {
            event.stopPropagation();
            if (event.key === "Enter" && !event.shiftKey && !event.repeat) {
              formik.submitForm();
            }
          }}
          customCSS={css`
            textarea {
              ::-webkit-scrollbar {
                width: 6px;
              }

              ::-webkit-scrollbar-thumb {
                background: #ccc;
                border-radius: 4px;
              }
              ::-webkit-scrollbar-thumb:hover {
                background: #b3b3b3;
                box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
              }
            }
          `}
        />
      </AtomWrapper>
    </AtomWrapper>
  );
};

export default ChatById;
