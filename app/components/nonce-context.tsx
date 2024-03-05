import { createContext } from "react";

// The default value (`undefined`) will be used on the client
export const NonceContext = createContext<string | undefined>(undefined);
