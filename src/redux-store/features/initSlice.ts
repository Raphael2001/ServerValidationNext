import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { copy } from "utils/functions";
import { CmsText, GeneralInfo, Init, Language } from "utils/types/init";

const initialState: Init = {
  texts: [],
  media: {},
  languages: [],
  generalInfo: [],
  links: [],

  iamRoles: [],

  modules: [],

  files: {},
  users: [],
  syncOptions: [],
  projects: [],
  sites: [],
};

export const initSlice = createSlice({
  name: "init",
  initialState: initialState,
  reducers: {
    setInit: (state, action) => action.payload,
    updateInit: (state: Init, action) => {
      return { ...state, ...action.payload };
    },

    upsertTextAction: (state: Init, action: PayloadAction<CmsText>) => {
      const { key } = action.payload;
      const indexOfText = state.texts.findIndex((l: CmsText) => l.key === key);

      if (indexOfText > -1) {
        state.texts[indexOfText] = action.payload;
      } else {
        state.texts.push(action.payload);
      }
    },

    deleteTextAction: (state: Init, action) => {
      const { key } = action.payload;

      const field = copy(state.texts);

      const index = field.findIndex((l) => l.key === key);

      if (index > -1) {
        field.splice(index);
      }

      state.texts = field;
    },

    addMediaAction: (state: Init, action) => {
      const mediaId = action.payload._id;
      state.media = { ...state.media, [mediaId]: action.payload };
    },

    removeMediaAction: (state: Init, action) => {
      const mediaId = action.payload;
      const media = { ...state.media };
      delete media[mediaId];
      state.media = media;
    },

    setGeneralInfo: (state: Init, action: PayloadAction<GeneralInfo>) => {
      const { name } = action.payload;

      state.generalInfo[name] = action.payload;
    },
    deleteGeneralInfoAction: (state: Init, action: PayloadAction<string>) => {
      const name = action.payload;

      delete state.generalInfo[name];
    },

    updateKey: (state, action) => {
      const { name, value } = action.payload;
      const { _id } = value;

      const field = copy(state[name]);

      const index = field.findIndex((m) => m._id === _id);

      if (index > -1) {
        state[name][index] = value;
      }
      return state;
    },
    addNewKey: (state, action) => {
      const { name, value } = action.payload;

      state[name].push(value);
      return state;
    },

    deleteKeyById: (state: Init, action) => {
      const { name, value } = action.payload;
      const { _id } = value;
      const field = copy(state[name]);

      const index = field.findIndex((l) => l._id === _id);

      if (index !== -1) {
        field.splice(index, 1);
      }

      state[name] = field;
    },

    upsertLang: (state: Init, action: PayloadAction<Language>) => {
      const { _id } = action.payload;
      const indexOfLang = state.languages.findIndex(
        (l: Language) => l._id === _id
      );

      if (indexOfLang > -1) {
        state.languages[indexOfLang] = action.payload;
      } else {
        state.languages.push(action.payload);
      }
    },

    addFileAction: (state: Init, action) => {
      const fileId = action.payload._id;
      state.files = { ...state.files, [fileId]: action.payload };
    },

    removeFileAction: (state: Init, action) => {
      const fileId = action.payload;
      const files = { ...state.files };
      delete files[fileId];
      state.files = files;
    },
  },
});

export const {
  addMediaAction,
  addNewKey,
  deleteGeneralInfoAction,
  deleteKeyById,
  deleteTextAction,
  removeMediaAction,
  setGeneralInfo,
  setInit,

  updateInit,
  updateKey,
  upsertLang,
  upsertTextAction,
  addFileAction,
  removeFileAction,
} = initSlice.actions;

export default initSlice.reducer;
