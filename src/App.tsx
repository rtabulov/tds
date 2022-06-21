import {
  ChevronDownIcon,
  ChevronUpIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/solid';
import useFilter from './hooks/useFilter';
import useSort from './hooks/useSort';
import TheTable from './components/TheTable';

// JSON data was generated with faker
// import data from './somedata-small.json';
import data from './somedata.json';

type DataItem = typeof data[number];

function App() {
  const { sortedData, sortBy, updateSortBy, sortDirection } = useSort(data);
  const {
    filteredData: filteredSortedData,
    filterValue,
    setFilterValue,
  } = useFilter(sortedData);

  const headings = {
    firstName: 'first name',
    lastName: 'last name',
    email: 'email',
    phone: 'phone',
    country: 'country',
  };

  const onHeadingClick = (key: keyof DataItem) => updateSortBy(key);

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

    return (
      <SwitchVerticalIcon className="w-5 h-5 inline align-middle text-slate-400" />
    );
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
        <div className="py-4">
          <button onClick={() => updateSortBy()}>reset sorting</button>
        </div>
      </header>

      <TheTable
        data={filteredSortedData}
        headings={headings}
        onHeadingClick={onHeadingClick}
        getKey={(item) => item.email}
        renderIcon={renderIcon}
        renderItem={(item) => (
          <>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.country}</td>
          </>
        )}
      />
    </div>
  );
}

export default App;
