import cs from 'classnames';

interface Props<T> {
  className?: string;
  children?: React.ReactNode;
  data: Array<T>;
  headings: Record<keyof T, string>;
  renderIcon: (key: string) => React.ReactNode;
  onHeadingClick: (key: keyof T) => void;
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => string | number;
}

export default function Table<T>({
  headings,
  renderIcon,
  onHeadingClick,
  data,
  renderItem,
  getKey,
}: Props<T>) {
  return (
    <table className="w-full">
      <thead className="text-teal-400">
        <tr>
          {Object.entries(headings).map(([key, value]) => (
            <th
              key={key}
              className="cursor-pointer"
              onClick={() => onHeadingClick(key as keyof T)}
            >
              <>
                {renderIcon(key)}
                {value}
              </>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={getKey(row)}>{renderItem(row)}</tr>
        ))}
      </tbody>
    </table>
  );
}
