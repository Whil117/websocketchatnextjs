/* eslint-disable react-hooks/exhaustive-deps */
import { QUERY_LIST_MESSAGES_BY_CHAT } from "@/apollo/query/messages";
import { useQuery } from "@apollo/client";
import { createClient } from "graphql-ws";
import { AtomText, AtomWrapper } from "lucy-nxtjs";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect } from "react";

type Props = {
  children?: ReactNode;
};

const client = createClient({
  // webSocketImpl: WebSocket,
  url: "ws://localhost:4000/graphql",
});

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
    const EXE = async () => {
      client.subscribe(
        {
          query: `subscription Subscription($input: InputSubscript) {
    postCreated(input: $input) {
      userId
      user {
        name
        lastName
        id
        age
      }
      message
      id
      conversationId
    }
  }`,
          variables: {
            input: {
              id: router?.query?.id,
            },
          },
        },
        {
          complete: () => {
            console.log("AAAA");
          },
          next: function (value): void {
            console.log(value);
          },
          error: function (error: unknown): void {
            console.log(error);
          },
        }
      );
    };
    EXE();
  }, []);

  return (
    <AtomWrapper>
      <AtomText>chat</AtomText>
    </AtomWrapper>
  );
};

export default ChatById;
