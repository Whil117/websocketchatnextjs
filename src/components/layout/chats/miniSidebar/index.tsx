import exportReduceWithAtom from "@/jotai/reducers/user";
import { css } from "@emotion/react";
import { useAtomValue } from "jotai";
import { AtomIcon, AtomImage, AtomWrapper } from "lucy-nxtjs";
import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const MiniSidebarPage: FC<Props> = () => {
  const user = useAtomValue(exportReduceWithAtom);

  return (
    <AtomWrapper
      alignItems="center"
      justifyContent="space-between"
      padding="20px 10px"
      customCSS={css`
        @media (max-width: 980px) {
          display: none;
        }
      `}
    >
      <AtomWrapper height="auto">
        <AtomIcon
          src="https://res.cloudinary.com/whil/image/upload/v1675014649/message-text_y2pedv.svg"
          color="default"
          width="30px"
          height="30px"
          customCSS={css`
            display: flex;
            padding: 3px;
            &:hover {
              border-left: 1px solid #07deff;
              svg {
                padding: 2px;
                path {
                  stroke: white;
                }
              }
            }
            svg {
              padding: 2px;
              path {
                stroke: white;
              }
            }
          `}
        />
      </AtomWrapper>
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
