import { useEffect, useState } from 'react';

// Returns a timestamp captured off-render (reading the clock during render is
// disallowed by the react-hooks purity rule). Re-reads whenever `refreshKey`
// changes, so time-based checks like staleness update when their inputs do. The
// update is deferred to a timeout so it doesn't run synchronously in the effect.
export function useNow(refreshKey?: number | null): number {
  const [now, setNow] = useState(0);
  useEffect(() => {
    const id = setTimeout(() => setNow(Date.now()), 0);
    return () => clearTimeout(id);
  }, [refreshKey]);
  return now;
}
