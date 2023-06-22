import React, { createContext, useContext, useState } from "react";
import { Word } from "../Type/Word";

type VocabularyContextType = {
  vocabulary: Word[];
  setVocabulary: (vocabulary: Word[]) => void;
};

const VocabularyContext = createContext<VocabularyContextType>({
  vocabulary: [],
  setVocabulary: () => {}
});

export const useVocabulary = () => {
  return useContext(VocabularyContext);
};

type Props = {
  children: React.ReactNode;
};

export const VocabularyProvider: React.FC<Props> = ({ children }) => {
  const [vocabulary, setVocabulary] = useState<Word[]>([]);

  return (
    <VocabularyContext.Provider value={{ vocabulary, setVocabulary }}>
      {children}
    </VocabularyContext.Provider>
  );
};
