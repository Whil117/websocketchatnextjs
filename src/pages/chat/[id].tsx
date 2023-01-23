/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { MUTATE_CREATE_MESSAGE_CHAT } from "@/apollo/mutate/chat";
import { QUERY_LIST_MESSAGES_BY_CHAT } from "@/apollo/query/messages";
import { SUBSCRIBE_MESSAGE_CHAT } from "@/apollo/subscribe/chat";
import { useMutation, useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import { useFormik } from "formik";
import {
  AtomButton,
  AtomImage,
  AtomInput,
  AtomLoader,
  AtomText,
  AtomWrapper,
} from "lucy-nxtjs";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import * as Yup from "yup";

type Props = {
  children?: ReactNode;
};

const ChatById: FC<Props> = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);

  const { data, subscribeToMore, loading } = useQuery(
    QUERY_LIST_MESSAGES_BY_CHAT,
    {
      skip: !router?.query?.id,
      fetchPolicy: "cache-and-network",
      variables: {
        filter: {
          take: 50,
          page: page,
          conversationId: router?.query?.id,
        },
      },
    }
  );

  const [EXECUTE_CREATE_MESSAGE] = useMutation(MUTATE_CREATE_MESSAGE_CHAT);

  useEffect(() => {
    if (page === 1) {
      console.log("WEBSOCKET");

      subscribeToMore({
        document: SUBSCRIBE_MESSAGE_CHAT,
        variables: {
          input: {
            id: "307e712c-a61c-4baf-af0c-3710aa15a019",
          },
        },
        updateQuery: (prev, { subscriptionData }: any) => {
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data?.postCreated;
          const newIm = {
            conversationId: newMessage?.conversationId,
            id: newMessage?.id,
            message: newMessage?.message,
            userId: newMessage?.userId,
            user: null,
            createdAt: newMessage?.createdAt ?? Date.now(),
          };

          const result = Object.assign({}, prev, {
            listMessagesByChatUser: {
              ...prev.listMessagesByChatUser,
              items: [newIm, ...(prev?.listMessagesByChatUser?.items ?? [])],
            },
          });

          return result;
        },
      });
    }
  }, [page]);

  const messages = useMemo(
    () =>
      [...(data?.listMessagesByChatUser?.items ?? [])]?.sort(
        (a, b) => a.createdAt - b.createdAt
      ),
    [data?.listMessagesByChatUser?.items]
  );

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().required(),
    }),
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

  // useEffect(() => {
  //   if (chatScroll.current) {
  //     chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
  //   }
  // }, [loading]);

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
      {loading ? (
        <AtomWrapper alignItems="center" justifyContent="center" height="100%">
          <AtomLoader isLoading colorLoad="#07deff" type="medium" />
        </AtomWrapper>
      ) : (
        <AtomWrapper
          ref={chatScroll}
          onScroll={() => {
            if (chatScroll.current) {
              const { scrollTop, clientHeight, scrollHeight } =
                chatScroll.current;
              if (data?.listMessagesByChatUser?.pageInfo?.hasNextPage) {
                if (chatScroll.current.scrollTop === 0) {
                  setPage((prev) => prev + 1);
                  // chatScroll.current.scrollTop =
                  //   chatScroll.current.scrollHeight - 40;
                }
              }
              if (data?.listMessagesByChatUser?.pageInfo?.hasPreviousPage) {
                if (scrollTop + clientHeight === scrollHeight) {
                  setPage((prev) => prev - 1);
                  // chatScroll.current.scrollTop = 40;
                }
              }
            }
          }}
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
          {messages?.map((item) => (
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
      )}
      <AtomWrapper
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
