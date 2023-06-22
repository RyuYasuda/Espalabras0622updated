import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

import { Word } from "../../Type/Word";
import { Header } from "../organisms/common/Header";
import { useForm } from "../organisms/CustumHooks/UseForm";
import { WordCard } from "../organisms/WordCard";
import { InputFormControl } from "../molecules/InputFormControl";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { SelectFormControl } from "../molecules/SelectFormControl";
import useNavigation from "../organisms/CustumHooks/UseNavigation";
import { useVocabulary } from "../../Provider/VocabularyContext";
import { useFirebase } from "../organisms/CustumHooks/useFirebase";
import { useValidation } from "../organisms/CustumHooks/useValidation";

export const AddWordPage = () => {
  const toast = useToast();
  const { vocabulary } = useVocabulary();
  const { navigateToWordViewPage } = useNavigation();
  const { getDataFromFirebase, handleAddWord, handleDelete } = useFirebase();
  const { formState, handleChange, resetForm } = useForm({
    word: "",
    meaning: "",
    gender: "N/A",
    wordType: "n",
    example: "",
    synonym: "",
    antonym: "",
    notes: ""
  });

  useEffect(() => {
    getDataFromFirebase();
    console.log("de-ta");
  }, []);

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

  // const [isValid, setIsValid] = useState<{ word: boolean; meaning: boolean }>({
  //   word: false,
  //   meaning: false
  // });

  // const [errorMessages, setErrorMessages] = useState<{
  //   word: string;
  //   meaning: string;
  // }>({
  //   word: "",
  //   meaning: ""
  // });

  // useEffect(() => {
  //   // バリデーションロジックをここに書く
  //   const newIsValid = {
  //     word: formState.word.trim() !== "",
  //     meaning: formState.meaning.trim() !== ""
  //   };
  //   setIsValid(newIsValid);

  //   setErrorMessages({
  //     word: newIsValid.word ? "" : "Word is required.",
  //     meaning: newIsValid.meaning ? "" : "Meaning is required."
  //   });
  // }, [formState]);

  // const isFormValid = isValid.word && isValid.meaning;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      const newWord: Word = {
        ...formState
      };

      toast({
        title: "単語追加完了！",
        description: "新しい単語を追加しました。",
        status: "success",
        duration: 3000,
        isClosable: true
      });

      handleAddWord(newWord);
      resetForm();
    }
  };

  return (
    <>
      <Header>
        <Flex>
          <PrimaryButton onClick={navigateToWordViewPage}>
            単語帳に戻る
          </PrimaryButton>
        </Flex>
      </Header>
      <Box
        as="form"
        onSubmit={handleSubmit}
        w="100%"
        maxW="md"
        mx="auto"
        mt={8}
        px={4}
        py={8}
        borderRadius="md"
        shadow="base"
        backgroundColor="white"
      >
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

        {/* 他のコンポーネントについても同様に修正... */}

        <Button
          type="submit"
          colorScheme={isFormValid ? "teal" : "red"}
          width="full"
          mt={4}
          disabled={!isFormValid}
        >
          {isFormValid ? "単語を追加！" : "単語と意味を追加してください"}
        </Button>
      </Box>
      {vocabulary.map((wordData, index) => (
        <WordCard
          numberId={index + 1}
          key={wordData.id}
          wordData={wordData}
          handleDelete={handleDelete}
        />
      ))}
    </>
  );
};
