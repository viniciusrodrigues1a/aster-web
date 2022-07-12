type EmptyListProps = {
  message: string;
  buttonTitle: string;
  onClick: () => void;
};

export function EmptyList({ message, buttonTitle, onClick }: EmptyListProps) {
  return (
    <div className="flex flex-col justify-center items-center m-20">
      <h1>{message}</h1>
      <button
        type="button"
        onClick={onClick}
        className="bg-blue-500 text-white px-6 py-2 rounded m-4"
      >
        {buttonTitle}
      </button>
    </div>
  );
}
