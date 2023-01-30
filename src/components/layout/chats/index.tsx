import { QUERY_LIST_CHAT_BY_USER } from "@/apollo/query/chat";
import exportReduceWithAtom from "@/jotai/reducers/user";
import { IQueryFilter } from "@/types";
import { useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import { useAtomValue } from "jotai";
import { AtomButton, AtomImage, AtomText, AtomWrapper } from "lucy-nxtjs";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import LayoutSearchUser from "./searchUser";

type Props = {
  children?: ReactNode;
};

const ComponentLayoutChats: FC<Props> = () => {
  const router = useRouter();
  const user = useAtomValue(exportReduceWithAtom);

  const { data } = useQuery<IQueryFilter<"listChatByUser">>(
    QUERY_LIST_CHAT_BY_USER,
    {
      variables: {
        filter: {
          userId: user?.id,
          take: null,
          page: null,
        },
      },
    }
  );
  return (
    <AtomWrapper
      backgroundColor="var(--background-color-secondary)"
      padding="20px"
      justifyContent="flex-start"
      gap="20px"
      customCSS={css`
        @media (max-width: 980px) {
          display: none;
        }
      `}
    >
      <AtomWrapper
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        padding="5px"
        height="auto"
      >
        <AtomText fontWeight="900" fontSize="22px">
          Messages
        </AtomText>
        <AtomButton
          backgroundLinearGradient={{
            rotate: "315deg",
            secondary: "#07deff",
            primary: "#0f97ff",
          }}
          padding="10px 15px"
        >
          + New
        </AtomButton>
      </AtomWrapper>
      <LayoutSearchUser>
        <AtomWrapper gap="10px" padding="5px" height="auto">
          {data?.listChatByUser?.items?.map((item) => (
            <AtomWrapper
              key={item?.id}
              flexDirection="row"
              flexWrap="nowrap"
              gap="10px"
              cursor="pointer"
              customCSS={css`
                display: grid;
                grid-template-columns: 60px 1fr;
              `}
            >
              <AtomImage
                src={item?.user?.image as string}
                width="60px"
                height="60px"
                borderRadius="50%"
              />
              <AtomWrapper cursor="pointer" height="auto">
                <AtomWrapper
                  flexDirection="row"
                  justifyContent="space-between"
                  width="100%"
                  onClick={() => {
                    router.push(`/chat/${item?.id}`);
                  }}
                  height="auto"
                >
                  <AtomText width="auto" fontWeight="bold" cursor="pointer">
                    {item?.user?.fullName ?? "No disponible"}
                  </AtomText>
                </AtomWrapper>
              </AtomWrapper>
            </AtomWrapper>
          ))}
        </AtomWrapper>
      </LayoutSearchUser>
    </AtomWrapper>
  );
};

export default ComponentLayoutChats;
