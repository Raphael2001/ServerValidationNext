import ApiManager from "api/ApiManager";
import API_METHODS from "constants/ApiMethods";
import LOCAL_STORAGE_KEYS from "constants/LocalStorage";
import Store from "redux-store";
import {
  addFileAction,
  addMediaAction,
  addNewKey,
  deleteGeneralInfoAction,
  deleteKeyById,
  deleteTextAction,
  removeFileAction,
  removeMediaAction,
  setGeneralInfo,
  setInit,
  updateKey,
  upsertLang,
  upsertTextAction,
} from "redux-store/features/initSlice";
import {
  setAccessToken,
  setRefreshToken,
} from "redux-store/features/tokensSlice";
import { updateUserData } from "redux-store/features/userDataSlice";
import { checkForJWTexp } from "utils/functions";
import { ApiResponse, ApiProps } from "utils/types/api";

const Api = (function () {
  async function accessTokenHeaders() {
    let token = Store.getState()?.tokens.accessToken;
    const isExpired = checkForJWTexp(token);

    if (isExpired) {
      function onSuccess(data) {
        token = data.access_token;
      }

      const refershProps = {
        onSuccess,
        payload: {},
      };

      await refreshToken(refershProps);
    }

    return { Authorization: `Bearer ${token}` };
  }

  function refreshTokenHeaders() {
    const token = Store.getState()?.tokens.refreshToken;
    return { Authorization: `Bearer ${token}` };
  }

  async function initCms(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(setInit(res.body));

      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();

    return ApiManager.addCall(props, API_METHODS.GET, "initCms", onSuccess);
  }

  async function upsertText(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(upsertTextAction(res.body));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "texts", onSuccess);
  }

  async function deleteText(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(deleteTextAction(res.body));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.DELETE, "texts", onSuccess);
  }

  async function login(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(setAccessToken(res.body.access_token));
      Store.dispatch(setRefreshToken(res.body.refresh_token));
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
        res.body.refresh_token
      );
      Store.dispatch(updateUserData({ permission: res.body.permission }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    return ApiManager.addCall(props, API_METHODS.POST, "login", onSuccess);
  }

  async function refreshToken(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(setAccessToken(res.body.access_token));
      if (res.body?.refresh_token) {
        Store.dispatch(setRefreshToken(res.body.refresh_token));
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
          res.body.refresh_token
        );
      }
      Store.dispatch(updateUserData({ permission: res.body.permission }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = refreshTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.GET, "refresh", onSuccess);
  }

  async function upsertLanguage(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(upsertLang(res.body.value));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "languages", onSuccess);
  }

  async function deleteLanguage(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(
        deleteKeyById({ value: res.body.value, name: "languages" })
      );
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(
      props,
      API_METHODS.DELETE,
      "languages",
      onSuccess
    );
  }

  async function upsertGeneralInfo(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(setGeneralInfo(res.body));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "generalInfo", onSuccess);
  }

  async function deleteGeneralInfo(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(deleteGeneralInfoAction(props.payload.name));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(
      props,
      API_METHODS.DELETE,
      "generalInfo",
      onSuccess
    );
  }

  async function deleteGeneralInfoMultiValuesId(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(setGeneralInfo(res.body));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(
      props,
      API_METHODS.DELETE,
      "generalInfoMultiValues",
      onSuccess
    );
  }

  async function addMedia(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addMediaAction(res.body));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "media", onSuccess);
  }

  async function removeMedia(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(removeMediaAction(props.payload.id));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.DELETE, "media", onSuccess);
  }

  async function upsertLink(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      if (props.payload?.id) {
        Store.dispatch(updateKey({ name: "links", value: res.body }));
      } else {
        Store.dispatch(addNewKey({ value: res.body, name: "links" }));
      }
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "links", onSuccess);
  }

  async function removeLink(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(deleteKeyById({ name: "links", value: res.body }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.DELETE, "links", onSuccess);
  }

  async function createRole(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addNewKey({ value: res.body, name: "iamRoles" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "iamRole", onSuccess);
  }

  async function updateRole(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(updateKey({ name: "iamRoles", value: res.body }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "iamRole", onSuccess);
  }

  async function createUser(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addNewKey({ value: res.body, name: "users" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "cmsUsers", onSuccess);
  }

  async function updateUser(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(updateKey({ value: res.body, name: "users" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "cmsUsers", onSuccess);
  }

  async function deleteUser(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(deleteKeyById({ value: res.body, name: "users" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.DELETE, "cmsUsers", onSuccess);
  }

  async function addFile(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addFileAction(res.body));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "file", onSuccess);
  }

  async function removeFile(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(removeFileAction(props.payload.id));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.DELETE, "file", onSuccess);
  }

  async function addProject(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addNewKey({ value: res.body, name: "projects" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "project", onSuccess);
  }

  async function updateProject(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(updateKey({ value: res.body, name: "projects" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "project", onSuccess);
  }

  async function deleteProject(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(deleteKeyById({ value: res.body, name: "projects" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.DELETE, "project", onSuccess);
  }

  async function addSite(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(addNewKey({ value: res.body, name: "sites" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.POST, "site", onSuccess);
  }

  async function updateSite(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(updateKey({ value: res.body, name: "sites" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.PUT, "site", onSuccess);
  }

  async function deleteSite(props: ApiProps = {}) {
    function onSuccess(res: ApiResponse) {
      Store.dispatch(deleteKeyById({ value: res.body, name: "sites" }));
      typeof props.onSuccess === "function" && props.onSuccess(res.body);
    }
    props.headers = await accessTokenHeaders();
    return ApiManager.addCall(props, API_METHODS.DELETE, "site", onSuccess);
  }

  return {
    initCms,
    upsertText,
    deleteText,
    login,
    refreshToken,
    upsertLanguage,
    deleteLanguage,
    upsertGeneralInfo,
    deleteGeneralInfo,
    deleteGeneralInfoMultiValuesId,
    addMedia,
    removeMedia,
    upsertLink,
    removeLink,

    createRole,
    updateRole,
    createUser,
    updateUser,
    deleteUser,

    addFile,
    removeFile,
    addProject,
    updateProject,
    deleteProject,
    addSite,
    updateSite,
    deleteSite,
  };
})();

export default Api;
