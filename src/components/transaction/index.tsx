type TransactionProps = {
  description: string;
  value: string;
  timeAgo: string;
  productName: string;
  icon: () => React.ReactElement;
};

export function Transaction({
  icon: Icon,
  value,
  description,
  timeAgo,
  productName,
}: TransactionProps) {
  return (
    <div
      className="max-w-2xl flex items-center mt-8 p-4 rounded"
      style={{ backgroundColor: "#EAEFF5" }}
    >
      <Icon />
      <div className="ml-6 w-full">
        <div className="flex justify-between">
          <p className="text-gray-800 text-size-md">{description}</p>

          <p className="text-gray-800 text-size-md">{value}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-gray-500 text-size-sm">{timeAgo}</p>

          {productName && (
            <p className="text-gray-700 text-size-sm">{productName}</p>
          )}
        </div>
      </div>
    </div>
  );
}
