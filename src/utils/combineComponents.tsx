import { ReactNode } from "react";

type ContextProviderProps<T> = {
  children: ReactNode;
};

type ContextProvider<T> = React.FC<ContextProviderProps<T>>;

export function combineComponents<T>(
  ...providers: ContextProvider<T>[]
): React.FC<{ children: ReactNode }> {
  return ({ children }) => {
    return providers.reduceRight((acc, Provider) => {
      return <Provider>{acc}</Provider>;
    }, children as ReactNode);
  };
}
