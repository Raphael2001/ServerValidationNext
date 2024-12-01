import { useAppSelector } from "./useRedux";
import Api from "api/requests";
import useNotificationsHandler from "./useNotificationsHandler";
import { copy } from "utils/functions";
import {
  GeneralInfo,
  GeneralInfoItem,
  GeneralInfoValue,
} from "utils/types/init";

export default function useGeneralInfo(name: string) {
  const { onSuccessNotification } = useNotificationsHandler();
  const generalInfoData: GeneralInfo = useAppSelector(
    (store) => store.init?.generalInfo?.[name]
  );
  const value = generalInfoData.value;
  const inputType = generalInfoData.inputType;
  const cmsTitle = generalInfoData.cmsTitle ?? "";

  const multiValues = Array.isArray(generalInfoData.value);

  const removeItemById = (id: string) => {
    const payload = { name, _id: id };
    function onSuccess() {
      onSuccessNotification();
    }
    Api.deleteGeneralInfoMultiValuesId({
      payload,
      onSuccess,
    });
  };

  function upsertGeneralInfo(
    value: GeneralInfoValue,
    callback = () => {},
    title = ""
  ) {
    const payload = { name, value, inputType };
    if (title) {
      payload["cmsTitle"] = title;
    }

    function onSuccess() {
      callback();
      onSuccessNotification();
    }
    Api.upsertGeneralInfo({
      payload,
      onSuccess,
    });
  }

  return {
    multiValues,
    value,
    inputType,
    cmsTitle,
    removeItemById,
    upsertGeneralInfo,
  };
}
