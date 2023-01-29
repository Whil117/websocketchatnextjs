import { QUERY_LIST_USERS } from "@/apollo/query/users";
import { IQueryFilter } from "@/types";
import { useQuery } from "@apollo/client";
import { css } from "@emotion/react";
import { AtomImage, AtomText, AtomWrapper } from "lucy-nxtjs";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  searchQuery: string;
};

const ListUsersSearch: FC<Props> = (props) => {
  const { searchQuery } = props;
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
          height="auto"
        >
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
