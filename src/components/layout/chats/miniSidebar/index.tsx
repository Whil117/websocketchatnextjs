import exportReduceWithAtom from "@/jotai/reducers/user";
import { css } from "@emotion/react";
import { useAtomValue } from "jotai";
import { AtomIcon, AtomImage, AtomWrapper } from "lucy-nxtjs";
import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const MiniSidebarPage: FC<Props> = (props) => {
  const user = useAtomValue(exportReduceWithAtom);

  return (
    <AtomWrapper
      alignItems="center"
      justifyContent="space-between"
      padding="20px 10px"
    >
      <AtomIcon
        src="https://res.cloudinary.com/whil/image/upload/v1675014649/message-text_y2pedv.svg"
        color="default"
        customCSS={css`
          border-left: 3px solid #07deff;
          display: flex;
          svg {
            padding: 2px;
            path {
              stroke: white;
            }
          }
        `}
      />
      <AtomImage
        src={user?.image as string}
        alt={user?.fullName}
        width="40px"
        height="40px"
        borderRadius="50%"
      />
    </AtomWrapper>
  );
};

export default MiniSidebarPage;
