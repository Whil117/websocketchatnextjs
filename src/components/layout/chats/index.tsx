import { css } from "@emotion/react";
import { AtomButton, AtomImage, AtomText, AtomWrapper } from "lucy-nxtjs";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import LayoutSearchUser from "./searchUser";

type Props = {
  children?: ReactNode;
};

const ComponentLayoutChats: FC<Props> = (props) => {
  const router = useRouter();
  return (
    <AtomWrapper
      backgroundColor="var(--background-color-secondary)"
      padding="20px"
      justifyContent="flex-start"
      gap="20px"
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
          {[
            {
              id: "307e712c-a61c-4baf-af0c-3710aa15a019",
              usersId: ["38672bf2-02ed-4438-96e4-f9dcf2f2ca5b"],
            },
          ].map((item) => (
            <AtomWrapper
              key={item.id}
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
                src="https://picsum.photos/200/300"
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
                    router.push(`/chat/${item.id}`);
                  }}
                  height="auto"
                >
                  <AtomText width="auto" fontWeight="bold" cursor="pointer">
                    CHAT 1
                  </AtomText>
                  <AtomText width="auto">2:40 PM</AtomText>
                </AtomWrapper>
                <AtomText cursor="pointer">Message</AtomText>
              </AtomWrapper>
            </AtomWrapper>
          ))}
        </AtomWrapper>
      </LayoutSearchUser>
    </AtomWrapper>
  );
};

export default ComponentLayoutChats;
