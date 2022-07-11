import { Link } from "react-router-dom";

export function SignUp() {
  return (
    <div className="flex justify-center items-center py-12 min-h-screen bg-slate-200">
      <div className="px-12 py-10 bg-neutral-50 rounded max-w-2xl w-4/5 sm:w-3/5 lg:w-2/5 shadow-lg">
        <h1 className="font-bold text-lg 2xl:text-xl 4xl:text-3xl">Register</h1>

        <form className="mt-10">
          <input
            type="text"
            placeholder="Enter name"
            className="border border-zinc-300 rounded pl-2 py-2 w-full"
          />
          <input
            type="email"
            placeholder="Enter email"
            className="border border-zinc-300 rounded pl-2 py-2 w-full mt-3"
          />
          <input
            type="password"
            placeholder="Enter password"
            className="border border-zinc-300 rounded pl-2 py-2 w-full mt-3"
          />

          <button
            type="submit"
            className="w-full bg-violet-500 p-2 mt-10 text-neutral-50 rounded text-base 2xl:text-lg 4xl:text-xl"
          >
            Create my account
          </button>
        </form>

        <Link to="/signin">
          <p className="w-full text-gray-500 text-center mt-3 text-sm 2xl:text-base 4xl:text-lg">
            Already have an account?
          </p>
        </Link>
      </div>
    </div>
  );
}
