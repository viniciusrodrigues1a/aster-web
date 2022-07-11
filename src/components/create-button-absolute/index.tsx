import { HTMLAttributes } from "react";
import { FiPlus } from "react-icons/fi";

type CreateButtonAbsoluteProps = HTMLAttributes<HTMLButtonElement> & {
  tooltipMsg: string;
};

export function CreateButtonAbsolute({
  tooltipMsg,
  ...rest
}: CreateButtonAbsoluteProps) {
  return (
    <div className="fixed right-8 bottom-8 group">
      <span className="hidden group-hover:block absolute bottom-20 -right-4 w-max max-w-24 bg-slate-700 p-2 box-shadow-xl text-white rounded-md">
        {tooltipMsg}
      </span>
      <div className="hidden group-hover:block absolute -top-5 right-1/2 translate-x-1/2 border-solid border-t-slate-700 border-t-8 border-x-transparent border-x-8 border-b-0"></div>
      <button
        {...rest}
        type="button"
        className="bg-blue-600 rounded-full p-3"
        style={{ boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.6)" }}
      >
        <FiPlus color="#fff" size={36} />
      </button>
    </div>
  );
}
