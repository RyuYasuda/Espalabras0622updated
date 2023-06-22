import {
  collection,
  query,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import db from "../../../firebase";
import { useVocabulary } from "../../../Provider/VocabularyContext";
import { Word } from "../../../Type/Word";

export const useFirebase = () => {
  const { vocabulary, setVocabulary } = useVocabulary();

  // データをFirebaseから読み込む
  const getDataFromFirebase = (): (() => void) => {
    const q = query(collection(db, "vocabulary"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const words: Word[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        words.push({
          id: doc.id,
          word: data.word,
          meaning: data.meaning,
          gender: data.gender,
          wordType: data.wordType,
          example: data.example,
          synonym: data.synonym,
          antonym: data.antonym,
          notes: data.notes
        });
      });
      setVocabulary(words);
    });

    return () => unsubscribe(); // Clean up subscription
  };

  // Firebaseにデータを追加する
  const handleAddWord = async (word: Word): Promise<void> => {
    try {
      await addDoc(collection(db, "vocabulary"), word);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Firebaseからデータを削除する
  const handleDelete = async (docId: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, "vocabulary", docId));
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  return { getDataFromFirebase, handleAddWord, handleDelete };
};
