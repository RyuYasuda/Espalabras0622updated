export type WordType = "n" | "v" | "adj" | "adv" | "prp" | "cjg" | "itg";
export type GenderType = "masculine" | "feminine" | "neuter" | "N/A";

export type Word = {
  id?: string;
  word: string;
  meaning: string;
  gender?: GenderType;
  wordType: WordType;
  example?: string;
  synonym?: string;
  antonym?: string;
  notes?: string;
};
