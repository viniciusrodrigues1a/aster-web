type ConfirmButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  title?: string;
  type?: "button" | "submit" | "reset";
};

export function ConfirmButton({
  title = "CONFIRM",
  type = "button",
}: ConfirmButtonProps) {
  return (
    <button
      type={type}
      className="bg-blue-600 py-2 px-6 rounded text-white tracking-wide hover:bg-blue-700"
    >
      {title}
    </button>
  );
}
