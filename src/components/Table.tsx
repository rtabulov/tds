import cs from 'classnames';

interface Props<T> {
  className?: string;
  children: React.ReactNode;
}

export default function Table<T>({ className, children }: Props<T>) {
  return <table className={cs(className, 'w-full')}>{children}</table>;
}
