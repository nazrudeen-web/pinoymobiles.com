"use client";
import { createContext, useContext } from "react";

export const VariantContext = createContext({
  selectedVariant: null,
  setSelectedVariant: () => {},
});

export function useVariant() {
  return useContext(VariantContext);
}
