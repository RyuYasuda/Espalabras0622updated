import { Flex, Input } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

import { WordCard } from "../organisms/WordCard";
import { Header } from "../organisms/common/Header";
import { VocabularyPage } from "../organisms/ExampleModal";
import { PrimaryButton } from "../atoms/PrimaryButton";
import useNavigation from "../organisms/CustumHooks/UseNavigation";
import { useVocabulary } from "../../Provider/VocabularyContext";
import { useFirebase } from "../organisms/CustumHooks/useFirebase";

export const WordViewPage: FC = () => {
  const { vocabulary } = useVocabulary();
  const { navigateToAddWordPage, navigateToOtherUsersPage } = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const { getDataFromFirebase, handleDelete } = useFirebase();

  const filteredVocabulary = vocabulary.filter((wordObject) =>
    wordObject.word.includes(searchTerm)
  );

  useEffect(() => {
    getDataFromFirebase();
  }, []);

  return (
    <>
      <Header>
        <Flex alignItems="center" justifyContent="space-around">
          <Input
            w="60%"
            mr="5"
            placeholder="Search words"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />

          <PrimaryButton onClick={navigateToAddWordPage}>
            単語を追加する
          </PrimaryButton>

          <PrimaryButton onClick={navigateToOtherUsersPage}>
            View Others
          </PrimaryButton>
        </Flex>
      </Header>
      <VocabularyPage />
      {filteredVocabulary.map((wordData, index) => (
        <WordCard
          key={wordData.id}
          id={index + 1}
          wordData={wordData}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
};
