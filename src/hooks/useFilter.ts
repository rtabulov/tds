import { useMemo, useState } from 'react';

export default function useFilter<T>(data: Array<T>) {
  const [filterValue, setFilterValue] = useState('');

  const filteredData = useMemo(() => {
    if (!filterValue) {
      return data;
    }

    return data.filter((item) =>
      Object.values(item)
        .join('')
        .toLowerCase()
        .includes(filterValue.toLowerCase()),
    );
  }, [filterValue, data]);

  return { filterValue, filteredData, setFilterValue };
}
