import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton";

import { Header } from "../organisms/common/Header";
import useNavigation from "../organisms/CustumHooks/UseNavigation";

export const OtherUsersPage: FC = () => {
  const { navigateToWordViewPage, navigateToAddWordPage } = useNavigation();
  return (
    <Header>
      <Flex>
        <PrimaryButton onClick={navigateToWordViewPage}>
          単語帳に戻る
        </PrimaryButton>

        <PrimaryButton onClick={navigateToAddWordPage}>
          単語を追加する
        </PrimaryButton>
      </Flex>
    </Header>
  );
};
