import { SuspenseProps } from 'react';

interface SuspensePositionProps extends SuspenseProps {
  loading: boolean;
}
export const CustomSuspense = ({ loading, fallback, children }: SuspensePositionProps) => {
  if (loading) return fallback;
  else return <>{children}</>;
};
