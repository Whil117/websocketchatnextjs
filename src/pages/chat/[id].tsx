/* eslint-disable react-hooks/exhaustive-deps */
import { QUERY_LIST_MESSAGES_BY_CHAT } from "@/apollo/query/messages";
import { SUBSCRIBE_MESSAGE_CHAT } from "@/apollo/subscribe/chat";
import { useQuery } from "@apollo/client";
import { AtomText, AtomWrapper } from "lucy-nxtjs";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect } from "react";

type Props = {
  children?: ReactNode;
};

const ChatById: FC<Props> = (props) => {
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

  useEffect(() => {
    subscribeToMore({
      document: SUBSCRIBE_MESSAGE_CHAT,
      variables: {
        input: {
          id: "307e712c-a61c-4baf-af0c-3710aa15a019",
        },
      },
      updateQuery: (prev, { subscriptionData }: any) => {
        console.log(subscriptionData);

        return {};
      },
    });
  }, [router?.query?.id]);

  return (
    <AtomWrapper>
      <AtomText>chat</AtomText>
    </AtomWrapper>
  );
};

export default ChatById;
