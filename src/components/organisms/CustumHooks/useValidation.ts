import { useState, useEffect } from "react";

type ValidationRule = {
  isValid: (value: any) => boolean;
  message: string;
};

type ValidationRulesType = {
  [key: string]: ValidationRule;
};
type FormStateType = {
  [key: string]: any;
};

type useValidationProps = {
  validationRules: ValidationRulesType;
  formState: FormStateType;
};

export const useValidation = ({
  formState,
  validationRules
}: useValidationProps) => {
  const [isValid, setIsValid] = useState<Record<string, boolean>>({});
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});

  useEffect(() => {
    let newIsValid: Record<string, boolean> = {};
    let newErrorMessages: Record<string, string> = {};

    for (let field in validationRules) {
      newIsValid[field] = validationRules[field].isValid(formState[field]);
      newErrorMessages[field] = newIsValid[field]
        ? ""
        : validationRules[field].message;
    }

    setIsValid(newIsValid);
    setErrorMessage(newErrorMessages);
  }, [formState, validationRules]);

  const isFormValid = Object.values(isValid).every((value) => value);

  return { isValid, errorMessage, isFormValid };
};
