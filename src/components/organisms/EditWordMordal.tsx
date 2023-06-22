import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import { useForm } from "./CustumHooks/UseForm";
import { Word } from "../../Type/Word";
import { InputFormControl } from "../molecules/InputFormControl";
import { useValidation } from "../organisms/CustumHooks/useValidation";
import { SelectFormControl } from "../molecules/SelectFormControl";

interface EditWordModalProps {
  wordData: Word;
  onUpdate: (updatedWord: Word) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const EditWordModal: React.FC<EditWordModalProps> = ({
  wordData,
  onUpdate,
  isEditing,
  setIsEditing
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { formState, handleChange, resetForm } = useForm(wordData);

  const handleSubmit = () => {
    onUpdate(formState);
    onClose();
    resetForm();
  };

  const validationRules = {
    word: {
      isValid: (value: string) => value.trim() !== "",
      message: "Word is required."
    },
    meaning: {
      isValid: (value: string) => value.trim() !== "",
      message: "Meaning is required."
    }
  };

  const { isValid, errorMessage, isFormValid } = useValidation({
    formState,
    validationRules
  });

  return (
    <>
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>単語を編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputFormControl
              errorMessage={errorMessage}
              isValid={!isValid.word}
              element="word"
              formState={formState}
              handleChange={handleChange}
            />
            <InputFormControl
              errorMessage={errorMessage}
              isValid={!isValid.meaning}
              element="meaning"
              formState={formState}
              handleChange={handleChange}
            />

<SelectFormControl
          element="gender"
          formState={formState}
          options={[
            { value: "masculine", label: "Masculine" },
            { value: "feminine", label: "Feminine" },
            { value: "neuter", label: "Neuter" },
            { value: "N/A", label: "N/A" }
          ]}
          handleChange={handleChange}
        />

        <SelectFormControl
          element="wordType"
          formState={formState}
          options={[
            { value: "n", label: "Noun" },
            { value: "v", label: "Verb" },
            { value: "adj", label: "Adjective" },
            { value: "adv", label: "Adverb" },
            { value: "prp", label: "Preposition" },
            { value: "cjg", label: "Conjugation" },
            { value: "itg", label: "Interrogative" }
          ]}
          handleChange={handleChange}
        />

        <InputFormControl
          element="example"
          formState={formState}
          handleChange={handleChange}
        />
        <InputFormControl
          element="synonym"
          formState={formState}
          handleChange={handleChange}
        />
        <InputFormControl
          element="antonym"
          formState={formState}
          handleChange={handleChange}
        />
        <InputFormControl
          element="notes"
          formState={formState}
          handleChange={handleChange}
        />

            {/* ... */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              更新
            </Button>
            <Button onClick={() => setIsEditing(false)}>キャンセル</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditWordModal;
