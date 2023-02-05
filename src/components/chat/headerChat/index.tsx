import { QUERY_CHAT_CONVERSATION_ID } from "@/apollo/query/chat";
import { IQueryFilter } from "@/types";
import { useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import { AtomImage, AtomLoader, AtomText, AtomWrapper } from "lucy-nxtjs";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const HeaderChat: FC<Props> = (props) => {
  const router = useRouter();
  const conversationId = router.query?.id;

  const { data: ChatConversationUser, loading } = useQuery<
    IQueryFilter<"chatByIdConversation">
  >(QUERY_CHAT_CONVERSATION_ID, {
    fetchPolicy: "cache-and-network",
    skip: !conversationId,
    variables: {
      filter: {
        conversationId: conversationId,
      },
    },
  });

  const headerChatInfo = ChatConversationUser?.chatByIdConversation;

  return (
    <>
      {loading ? (
        <AtomWrapper
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <AtomLoader
            isLoading
            type="large"
            colorLoad="#07deff"
            customCSS={() => css`
              align-items: center;
              justify-content: center;
            `}
          />
        </AtomWrapper>
      ) : (
        <>
          <AtomWrapper
            backgroundColor="var(--background-color-header-chat)"
            height="75px"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            padding="10px 20px"
            gap="20px"
          >
            <AtomImage
              src={
                headerChatInfo?.user?.image ?? "https://picsum.photos/200/300"
              }
              width="45px"
              height="45px"
              borderRadius="50%"
            />

            <AtomText width="auto" fontWeight="bold" fontSize="16px">
              {headerChatInfo?.user?.fullName}
            </AtomText>
          </AtomWrapper>
          {props?.children}
        </>
      )}
    </>
  );
};

export default HeaderChat;
