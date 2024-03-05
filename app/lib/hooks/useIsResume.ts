
import { useLocation } from '@remix-run/react';

export const useIsResume = () => {
  return useLocation().pathname === "/resume";
}
