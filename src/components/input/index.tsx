type InputProps = {
  type: string;
  name: string;
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({
  type,
  name,
  id,
  placeholder,
  label,
  required,
  min,
  value,
  onChange,
}: InputProps) {
  return (
    <>
      <label
        htmlFor={id}
        className={
          required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""
        }
      >
        {label}
      </label>
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
    </>
  );
}
