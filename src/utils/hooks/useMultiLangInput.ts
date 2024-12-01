import { useMemo } from "react";
import { useAppSelector } from "./useRedux";
import { FormInputData } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";

function useMultiLangInput() {
  const languages = useAppSelector((store) => store.init?.languages);

  const getLangInputs = useMemo(
    () =>
      (
        name: string,
        label: string,
        rules: Array<string> = [...["no_validation"]]
      ): FormInputData[] => {
        return languages.map((languageData) => ({
          name: `${name}.${languageData._id}`,
          inputType: FORM_INPUTS_TYPES.INPUT,
          label: `${label} - ${languageData.lang}`,
          rules,
        }));
      },
    [languages] // Dependencies for memoization
  );

  return getLangInputs;
}

export default useMultiLangInput;
