import exportReduceWithAtom from "@/jotai/reducers/user";
import { css } from "@emotion/react";
import { useAtomValue } from "jotai";
import { AtomIcon, AtomText, AtomWrapper } from "lucy-nxtjs";
import { NextPageFC } from "next";

const Home: NextPageFC = () => {
  const user = useAtomValue(exportReduceWithAtom);
  return (
    <AtomWrapper alignItems="center" height="100%" justifyContent="center">
      <AtomIcon
        src="https://res.cloudinary.com/whil/image/upload/v1672012439/Frame_4_ggrnnh.svg"
        color="default"
        customCSS={css`
          svg {
            path {
              stroke: #07deff;
            }
          }
        `}
      />
      <AtomText fontSize="18px" fontWeight="normal">
        Welcome {user?.fullName}!
      </AtomText>
    </AtomWrapper>
  );
};
Home.type = "chat";
export default Home;
