"use client";
import { ChangeEvent, createContext } from "react";

interface FilterSidebarContextType {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const contextData: FilterSidebarContextType = {
  handleChange: (event) => {},
  // Other properties in SidebarContextType
};

export const FilterSidebarContext =
  createContext<FilterSidebarContextType>(contextData);
