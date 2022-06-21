import {
  ChevronDownIcon,
  ChevronUpIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/solid';
import { useMemo, useState } from 'react';
import useFilter from './hooks/useFilter';
import useSort from './hooks/useSort';
import data from './somedata.json';

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type DataKey = keyof ArrayElement<typeof data>;

function App() {
  const { sortedData, sortBy, updateSortBy, sortDirection } = useSort(data);

  const {
    filteredData: filteredSortedData,
    filterValue,
    setFilterValue,
  } = useFilter(sortedData);

  const onHeadingClick = (key: DataKey) => updateSortBy(key);

  const headings = {
    firstName: 'first name',
    lastName: 'last name',
    email: 'email',
    phone: 'phone',
    country: 'country',
  };

  const renderIcon = (key: string) => {
    if (sortBy === key) {
      if (sortDirection > 0) {
        return (
          <ChevronUpIcon className="w-5 h-5 inline align-middle text-teal-400" />
        );
      }

      return (
        <ChevronDownIcon className="w-5 h-5 inline align-middle text-teal-400" />
      );
    }

    return <SwitchVerticalIcon className="w-5 h-5 inline align-middle" />;
  };

  return (
    <div className="bg-slate-800 text-white min-h-screen text-center">
      <header className="py-8">
        <h1 className="text-2xl font-bold mb-4">THE TABLE</h1>

        <div className="flex gap-3 justify-center items-center">
          <label htmlFor="filterInput">filter</label>

          <input
            id="filterInput"
            className="outline-none focus:ring rounded-md py-1.5 px-4 ring-teal-400 transition-shadow bg-slate-500"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </div>
      </header>

      <table className="w-full">
        <thead className="text-teal-200">
          <tr>
            {Object.entries(headings).map(([key, value]) => (
              <th
                key={key}
                className="cursor-pointer"
                onClick={() => onHeadingClick(key as DataKey)}
              >
                {value}
                {renderIcon(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredSortedData.map((row) => (
            <tr key={row.email}>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.email}</td>
              <td>{row.phone}</td>
              <td>{row.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
