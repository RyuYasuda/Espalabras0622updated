import { Button } from "@chakra-ui/react";
import { FC } from "react";

type PrimaryButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
};

export const PrimaryButton: FC<PrimaryButtonProps> = (props) => {
  const { onClick, children } = props;
  return (
    <Button onClick={onClick} colorScheme="teal" variant="outline" mr={4} p="4">
      {children}
    </Button>
  );
};
