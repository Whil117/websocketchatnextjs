import { MUTATE_CREATE_CHAT } from "@/apollo/mutate/chat";
import { QUERY_LIST_USERS } from "@/apollo/query/users";
import exportReduceWithAtom from "@/jotai/reducers/user";
import { IMutationFilter, IQueryFilter } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import { useAtomValue } from "jotai";
import { AtomImage, AtomText, AtomWrapper } from "lucy-nxtjs";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  searchQuery: string;
};

const ListUsersSearch: FC<Props> = (props) => {
  const { searchQuery } = props;
  const user = useAtomValue(exportReduceWithAtom);
  const router = useRouter();
  const { data } = useQuery<IQueryFilter<"listUsers">>(QUERY_LIST_USERS, {
    variables: {
      input: {
        input: {
          take: 50,
          page: 1,
        },
        filter: {
          fullName: searchQuery,
        },
      },
    },
  });

  const [EXECUTE_CREATE_CHAT] =
    useMutation<IMutationFilter<"createChatByUser">>(MUTATE_CREATE_CHAT);
  return (
    <AtomWrapper justifyContent="flex-start" gap="15px">
      {data?.listUsers?.items?.map((item) => (
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
          onClick={() => {
            EXECUTE_CREATE_CHAT({
              variables: {
                input: {
                  toUserId: item?.id,
                  userId: user?.id,
                },
              },
              onCompleted: (data) => {
                router.push(`/chat/${data?.createChatByUser?.id}`);
              },
            });
          }}
          height="auto"
        >
          asdfasdf
          <AtomImage
            src={item?.image ?? "https://picsum.photos/200/300"}
            width="60px"
            height="60px"
            borderRadius="50%"
          />
          <AtomWrapper cursor="pointer" height="100%" justifyContent="center">
            <AtomText width="auto" fontWeight="bold" cursor="pointer">
              {item?.fullName}
            </AtomText>
          </AtomWrapper>
        </AtomWrapper>
      ))}
    </AtomWrapper>
  );
};

export default ListUsersSearch;
