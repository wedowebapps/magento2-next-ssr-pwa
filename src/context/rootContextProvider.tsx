"use client";
import { combineComponents } from "@/utils/combineComponents";
import {
  AppContextProvider,
  AppContextProviderProps,
  CartContextProvider,
  CartContextProviderProps,
} from "@/context";

export const RootContextProvider = combineComponents<
  AppContextProviderProps | CartContextProviderProps
>(AppContextProvider, CartContextProvider);
