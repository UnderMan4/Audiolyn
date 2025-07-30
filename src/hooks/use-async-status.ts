import { useCallback, useState } from "react";

export type AsyncStatus<T> = {
   loading: boolean;
   error: Error | null;
   value: T | null;
   run: (promise: Promise<T>) => void;
};

export const useAsyncStatus = <T = unknown>(): AsyncStatus<T> => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<Error | null>(null);
   const [value, setValue] = useState<T | null>(null);

   const run = useCallback((promise: Promise<T>) => {
      setLoading(true);
      setError(null);
      setValue(null);
      promise
         .then((result) => {
            setValue(result);
            setLoading(false);
         })
         .catch((err) => {
            setError(err);
            setLoading(false);
         });
   }, []);

   return { loading, error, value, run };
};
