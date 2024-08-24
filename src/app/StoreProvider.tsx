"use client";

import { setupListeners } from "@reduxjs/toolkit/query";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "redux-store";
import { setInitApp } from "redux-store/features/initAppSlice";
import DeviceState from "utils/deviceState";
import { InitApp } from "utils/types/initApp";

interface Props {
  readonly children: ReactNode;
  data?: InitApp;
}

export const StoreProvider = ({ children, data }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    if (data) {
      storeRef.current.dispatch(setInitApp(data));
    }
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  useEffect(() => {
    DeviceState.init();
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
