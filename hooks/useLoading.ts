import { useState } from 'react';

export type LoadingValues = [(...args: any[]) => any, boolean];

export type LoadingAction = (...args: any) => Promise<any>;

export const useLoading = (action: LoadingAction): LoadingValues => {
  const [loading, setLoading] = useState(false);

  const doAction = (...args) => {
    setLoading(true);
    return action(...args).finally(() => setLoading(false));
  };

  return [doAction, loading];
};
