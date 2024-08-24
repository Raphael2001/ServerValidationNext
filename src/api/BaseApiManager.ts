import POPUP_TYPES from "constants/popup-types";
import Store from "redux-store";
import { addPopup } from "redux-store/features/popupsSlice";

const BaseApiManager = (function () {
  const api = {
    baseUrl: process.env.NEXT_PUBLIC_HOST,
    version: process.env.NEXT_PUBLIC_API_VERSION,
    api: process.env.NEXT_PUBLIC_API,
  };

  function buildeUrl(methodName: string, overrideUrl?: string) {
    if (overrideUrl) {
      return overrideUrl + "/" + methodName;
    }
    return api.baseUrl + "/" + api.api + "/" + api.version + "/" + methodName;
  }

  function getHeaders() {
    return { "Content-Type": "application/json; charset=UTF-8" };
  }

  function onFailure(response: string) {
    Store.dispatch(
      addPopup({
        type: POPUP_TYPES.API_ERROR,
        payload: { text: response },
      })
    );
  }

  function onSuccess() {}
  return {
    buildeUrl,
    getHeaders,

    onFailure,
    onSuccess,
  };
})();

export default BaseApiManager;
