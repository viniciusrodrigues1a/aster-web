type CancelButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  title?: string;
};

export function CancelButton({ title = "CANCEL", onClick }: CancelButtonProps) {
  return (
    <button
      type="button"
      className="text-gray-500 tracking-wide hover:text-gray-700"
      onClick={onClick}
    >
      CANCEL
    </button>
  );
}
