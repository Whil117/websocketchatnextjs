import { css } from "@emotion/react";
import {
  AtomButton,
  AtomImage,
  AtomInput,
  AtomText,
  AtomWrapper,
} from "lucy-nxtjs";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const ComponentLayoutChats: FC<Props> = (props) => {
  const router = useRouter();
  return (
    <AtomWrapper
      // height="100%"
      width="320px"
      backgroundColor="white"
      padding="20px"
      gap="10px"
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
      <AtomInput
        type="text"
        placeholder="Search conversation"
        customCSS={css`
          input {
            position: relative;
            background-color: red !important;
          }
          input::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
            background-image: url("https://res.cloudinary.com/whil/image/upload/v1661401540/search-normal_afllai.svg");
            background-repeat: no-repeat;
            width: 20px;
            height: 20px;
          }
        `}
      />
      <AtomWrapper gap="10px" padding="5px">
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
              borderRadius="10px"
            />
            <AtomWrapper cursor="pointer">
              <AtomWrapper
                flexDirection="row"
                justifyContent="space-between"
                width="100%"
                onClick={() => {
                  router.push(`/chat/${item.id}`);
                }}
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
    </AtomWrapper>
  );
};

export default ComponentLayoutChats;
