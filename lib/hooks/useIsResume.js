
import { useRouter } from 'next/router';

export const useIsResume = () => {
  return useRouter().pathname === "/resume";
}
