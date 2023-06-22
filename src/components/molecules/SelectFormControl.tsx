import { FormControl, FormLabel, Select } from "@chakra-ui/react";

type SelectFormControlProps = {
  element: string;
  formState: { [key: string]: any };
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
};

export const SelectFormControl: React.FC<SelectFormControlProps> = (props) => {
  const { element, formState, options, handleChange } = props;
  return (
    <FormControl id={element} my={4}>
      <FormLabel htmlFor={element}>
        {element.charAt(0).toUpperCase() + element.slice(1)}
      </FormLabel>
      <Select name={element} value={formState[element]} onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
