import { useMemo, useState } from 'react';

type SortDirection = -1 | 1;

export default function useSort<T>(data: Array<T>) {
  const [sortBy, setSortBy] = useState<keyof T | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<SortDirection>(1);

  const sortedData = useMemo(() => {
    if (!sortBy) {
      return [...data];
    }
    return [...data].sort(
      (a, b) => sortDirection * (a[sortBy] > b[sortBy] ? 1 : -1),
    );
  }, [data, sortBy, sortDirection]);

  function updateSortBy(key?: keyof T) {
    if (sortBy === key) {
      setSortDirection((sortDirection * -1) as SortDirection);
    } else {
      setSortBy(key);
      setSortDirection(1);
    }
  }

  return { sortedData, updateSortBy, sortBy, sortDirection };
}
