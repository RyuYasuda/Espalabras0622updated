import {
  Box,
  Text,
  Flex,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import { updateDoc, doc } from "firebase/firestore";
import React, { useState } from "react";

import { Word } from "../../Type/Word";
import db from "../../firebase";
import EditWordModal from "./EditWordMordal";

type WordCardProps = {
  numberId?: number;
  wordData: Word;
  handleDelete: (id: number) => void;
};

export const WordCard: React.FC<WordCardProps> = React.memo((props) => {
  console.log("WordCard");
  const { wordData, handleDelete, numberId } = props;
  const {
    id,
    word,
    meaning,
    gender,
    wordType,
    example,
    synonym,
    antonym,
    notes
  } = wordData;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [editedWord, setEditedWord] = useState(wordData);

  const handleEdit = async (updatedWordData: Word) => {
    try {
      const docRef = doc(db, "vocabulary", wordData.id);
      await updateDoc(docRef, updatedWordData);
      setEditedWord(updatedWordData);
      setIsEditing(false);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const confirmDelete = () => {
    handleDelete(id);
    onClose();
  };

  return (
    <>
      {isEditing ? (
        <EditWordModal
          wordData={wordData}
          onUpdate={handleEdit}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      ) : (
        <Box border="1px" borderColor="gray.200" borderRadius="md" p={4} m="4">
          <Text>{numberId}</Text>
          <Flex justifyContent="flex-start" alignItems="center" mb={4}>
            <Text fontSize="2xl" fontWeight="bold" mr="4">
              {word}
            </Text>
            {wordType === "n" && (
              <Text
                fontSize="2xl"
                fontWeight="bold"
                mr="4"
                color={gender === "masculine" ? "blue.400" : "red.400"}
              >
                {gender === "masculine" ? "m" : "f"}
              </Text>
            )}
            <Text fontSize="2xl" fontWeight="bold">
              {wordType}
            </Text>
          </Flex>
          <Text>意味: {meaning}</Text>
          <Text>例文: {example}</Text>
          <Text>同義語: {synonym}</Text>
          <Text>対義語: {antonym}</Text>
          <Text>備考: {notes}</Text>

          <Flex justifyContent="space-between">
            <Button
              colorScheme="black"
              variant="outline"
              onClick={() => setIsEditing(true)}
              mt={2}
              _hover={{ backgroundColor: "gray.300" }}
            >
              編集
            </Button>
            <Button colorScheme="red" variant="outline" onClick={onOpen} mt={2}>
              Delete
            </Button>
          </Flex>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>単語を削除</ModalHeader>
              <ModalCloseButton />
              <ModalBody>こちらの単語を単語帳から削除しますか？</ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="red"
                  variant="outline"
                  mr={3}
                  onClick={confirmDelete}
                >
                  Yes
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  No
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </>
  );
});

export default React.memo(WordCard);
