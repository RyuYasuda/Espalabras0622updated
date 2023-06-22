import { Box } from "@chakra-ui/react";
import React from "react";

interface HeaderProps {
  children: React.ReactNode;
  // searchTerm: string;
  // setSearchTerm: (value: string) => void;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const {
    // searchTerm,
    //  setSearchTerm,
    children
  } = props;

  return (
    <Box bg="teal.400" w="100%" p={4} color="white" mb="4">
      {children}
    </Box>
  );
};
