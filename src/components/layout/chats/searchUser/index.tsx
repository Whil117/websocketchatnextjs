import { AtomInput } from "lucy-nxtjs";
import { FC, ReactNode, useState } from "react";
import ListUsersSearch from "../listUsers";

type Props = {
  children: ReactNode;
};

const LayoutSearchUser: FC<Props> = ({ children }) => {
  const [searchQuery, setsearchQuery] = useState("");
  return (
    <>
      <AtomInput
        type="text"
        placeholder="Search conversation"
        value={searchQuery}
        onChange={(event) => {
          setsearchQuery(event.target.value);
        }}
        isFocus={Boolean(searchQuery?.length)}
        accentColor="#0f97ff"
      />
      {!searchQuery?.length ? (
        children
      ) : (
        <ListUsersSearch searchQuery={searchQuery} />
      )}
    </>
  );
};

export default LayoutSearchUser;
