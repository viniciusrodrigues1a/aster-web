type InputProps = {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  min?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
  type,
  name,
  id,
  placeholder,
  min,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      min={min}
      value={value}
      onChange={onChange}
      className="border border-slate-400 rounded pl-2 py-2 w-full"
    />
  );
}
