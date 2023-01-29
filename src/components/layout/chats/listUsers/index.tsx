import { QUERY_LIST_USERS } from "@/apollo/query/users";
import { IQueryFilter } from "@/types";
import { useQuery } from "@apollo/client";
import { AtomText, AtomWrapper } from "lucy-nxtjs";
import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  searchQuery: string;
};

const ListUsersSearch: FC<Props> = (props) => {
  const { searchQuery } = props;
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
    <AtomWrapper justifyContent="flex-start">
      {data?.listUsers?.items?.map((item) => (
        <AtomText key={item?.id}>{item?.name}</AtomText>
      ))}
    </AtomWrapper>
  );
};

export default ListUsersSearch;
