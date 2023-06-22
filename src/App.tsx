import "./styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { WordViewPage } from "./components/pages/WordViewPage";
import { AddWordPage } from "./components/pages/AddWordPage";
import { OtherUsersPage } from "./components/pages/OtherUsersPage";
import { VocabularyProvider } from "./Provider/VocabularyContext";

export default function App() {
  return (
    <VocabularyProvider>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WordViewPage />} />
            <Route path="/add-word" element={<AddWordPage />} />
            <Route path="/other-users" element={<OtherUsersPage />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </VocabularyProvider>
  );
}
