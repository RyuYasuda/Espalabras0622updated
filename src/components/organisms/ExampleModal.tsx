import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react";

import { Word } from "../../Type/Word";
import WordCard from "./WordCard";

export const VocabularyPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // モーダルに表示する単語データを準備します
  const exampleWord: Word = {
    id: "1",
    word: "nombre",
    meaning: "name",
    gender: "masculine",
    wordType: "n",
    example: "Mi nombre es Juan.",
    synonym: "apodo",
    antonym: "", // 名詞のため対義語はなし
    notes: "generalmente masculino"
  };

  return (
    <>
      <Button ml="4" onClick={onOpen}>
        例を見る
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WordCard wordData={exampleWord} handleDelete={onClose} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VocabularyPage;
